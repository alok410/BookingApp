import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsByUser } from '../redux/bookingSlice'; // Correct import

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.booking);

  // Assume userId is available or comes from the logged-in user
  const userId = 1; // Replace with actual user ID, possibly from auth state or context

  useEffect(() => {
    dispatch(getBookingsByUser(userId)); // Fetch bookings for the user
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
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {/* Render booking details here */}
            {booking.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
