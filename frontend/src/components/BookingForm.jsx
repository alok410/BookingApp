import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../redux/bookingSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BookingForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [bookingSlot, setBookingSlot] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Access user from Redux

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(user.id);
  
    const payload = {
      customerName,
      customerEmail,
      bookingDate,
      bookingType,
      bookingSlot,
      fromTime,
      toTime,
      userId: user.id, 
    };
  
    console.log('Attempting to submit booking:', payload);
  
    try {
      const response = await dispatch(createBooking(payload)).unwrap();
      console.log('Booking successful:', response);
      alert('Booking submitted successfully!');
      navigate('/bookings'); 
    } catch (error) {
      console.error('Booking submission failed:', error);
      if (error.message.includes("Full Day booking already")) {
        alert("Error: A Full Day booking already exists for this date. Please select a different date.");
      } else {
        alert('Booking submission failed! Check console for details.');
      }
    }
  };
  
  const formStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: '#f9f9f9'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #bbb',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        required
        style={inputStyle}
      />
      <select
        value={bookingType}
        onChange={(e) => setBookingType(e.target.value)}
        required
        style={inputStyle}
      >
        <option value="">Select Booking Type</option>
        <option value="Full Day">Full Day</option>
        <option value="Half Day">Half Day</option>
        <option value="Custom">Custom</option>
      </select>

      {bookingType === 'Half Day' && (
        <select
          value={bookingSlot}
          onChange={(e) => setBookingSlot(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select Slot</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
        </select>
      )}

      {bookingType === 'Custom' && (
        <>
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            required
            style={inputStyle}
          />
        </>
      )}

      <button type="submit" style={buttonStyle}>Submit Booking</button>
    </form>
  );
};

export default BookingForm;
