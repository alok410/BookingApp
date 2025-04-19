import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUpUser({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Successfully signed up!");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((error) => {
        console.error("Error during sign-up:", error);
        toast.error("Sign-up failed. Please try again.");
      });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  // Inline styles
  const formStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #bbb',
    fontSize: '16px',
    width: '100%'
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px'
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" style={formStyle}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoComplete="off"
          style={inputStyle}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          autoComplete="off"
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
