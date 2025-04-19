const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/usermodel');
const sendVerificationEmail = require('../utils/sendEmail');


exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });


    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email/${verificationToken}`;
    const emailHtml = `
      <p>Hello ${firstName},</p>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
    `;
    await sendVerificationEmail(email, 'Email Verification', emailHtml);

    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    user.isVerified = true;
    user.verificationToken = null; 
    await user.save();

    res.status(200).json({ message: 'Email verified. You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isVerified) return res.status(403).json({ message: 'Email not verified' });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });


    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d', 
    });

    res.status(200).json({
      token,
      user: { id: user.id, firstName: user.firstName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
