import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsByUser } from '../redux/bookingSlice'; // Correct import

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.booking);

  const userId = 1; 

  useEffect(() => {
    dispatch(getBookingsByUser(userId)); 
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
            {booking.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
