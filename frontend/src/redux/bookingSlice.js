import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// 🟦 Thunk to create a new booking
export const createBooking = createAsyncThunk(
    'bookings/createBooking',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await api.post('/bookings/createBooking', payload);
        return response.data.booking;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  
  export const getBookingsByUser = createAsyncThunk(
    'bookings/getBookingsByUser',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/bookings/getBookingsByUser?userId=${userId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getBookingsByUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getBookingsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(getBookingsByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default bookingSlice.reducer;
