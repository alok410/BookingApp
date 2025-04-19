import React from 'react';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import BookingForm from '../components/BookingForm';

const Home = () => {
  // Access the authentication state from Redux
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
 
  // Initialize the navigate function
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Booking App</h1>
      
      {isLoggedIn ? (
        <BookingForm />  // Show BookingForm if the user is logged in
      ) : (
        <div>
          <p>Please log in to make a booking.</p>
          <button onClick={() => navigate('/login')}>  {/* Navigate to login page */}
            Click here to log in
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
