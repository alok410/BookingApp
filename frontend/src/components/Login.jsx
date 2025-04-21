import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear previous error

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
        if (error?.response?.status == 403) {
          setErrorMsg('Not verified, please verify first');
        } else {
          setErrorMsg('Login failed. Please check your credentials or try again later.');
        }
      });
  };

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

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {errorMsg && <p style={errorStyle}>{errorMsg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Login</button>
    </form>
  );
};

export default Login;
