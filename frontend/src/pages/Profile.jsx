import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const containerStyle = {
    padding: '20px',
    maxWidth: '500px',
    margin: '40px auto',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333'
  };

  const detailStyle = {
    fontSize: '18px',
    margin: '10px 0',
    color: '#555'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Profile</h1>
      <p style={detailStyle}>Name: {user?.firstName} {user?.lastName}</p>
      <p style={detailStyle}>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
