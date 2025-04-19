import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { getBookingsByUser } from '../redux/bookingSlice';
import { useParams } from 'react-router-dom';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.booking); 
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getBookingsByUser(userId));
    }
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              {booking.details || `Booking ID: ${booking.id}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
