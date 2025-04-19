import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const buttonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px'
  };

  return <button onClick={handleLogout} style={buttonStyle}>Logout</button>;
};

export default Logout;
