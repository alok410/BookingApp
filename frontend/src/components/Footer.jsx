import React from 'react';

const Footer = () => {
  const footerStyle = {
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#f1f1f1',
    color: '#333',
    fontSize: '14px',
    position: 'relative',
    bottom: '0',
    width: '100%',
    marginTop: '40px'
  };

  return <footer style={footerStyle}>&copy; 2025 MyBookingApp</footer>;
};

export default Footer;
