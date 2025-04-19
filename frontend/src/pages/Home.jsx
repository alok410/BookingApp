import React from 'react';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import BookingForm from '../components/BookingForm';

const Home = () => {
  // Access the authentication state from Redux
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
 
  // Initialize the navigate function
  const navigate = useNavigate();

  // Inline styles
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const headingStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s'
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the Booking App</h1>
      
      {isLoggedIn ? (
        <BookingForm />  
      ) : (
        <div>
          <p style={paragraphStyle}>Please log in to make a booking.</p>
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}  
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}  
            onClick={() => navigate('/login')}  
          >
            Click here to log in
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
