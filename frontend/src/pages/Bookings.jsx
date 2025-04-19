import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { getBookingsByUser } from '../redux/bookingSlice';
import { useParams, useNavigate } from 'react-router-dom';

const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, status, error } = useSelector((state) => state.booking); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const { userId } = useParams();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    if (userId) {
      dispatch(getBookingsByUser(userId));
    }
  }, [dispatch, userId, isLoggedIn, navigate]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thTdStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left'
  };

  const headerStyle = {
    backgroundColor: '#f2f2f2'
  };

  return (
    <div style={containerStyle}>
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr>
              <th style={thTdStyle}>ID</th>
              <th style={thTdStyle}>Customer Name</th>
              <th style={thTdStyle}>Customer Email</th>
              <th style={thTdStyle}>Booking Date</th>
              <th style={thTdStyle}>Booking Type</th>
              <th style={thTdStyle}>Booking Slot</th>
              <th style={thTdStyle}>From Time</th>
              <th style={thTdStyle}>To Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td style={thTdStyle}>{booking.id}</td>
                <td style={thTdStyle}>{booking.customerName}</td>
                <td style={thTdStyle}>{booking.customerEmail}</td>
                <td style={thTdStyle}>{booking.bookingDate}</td>
                <td style={thTdStyle}>{booking.bookingType}</td>
                <td style={thTdStyle}>{booking.bookingSlot}</td>
                <td style={thTdStyle}>{booking.fromTime}</td>
                <td style={thTdStyle}>{booking.toTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
