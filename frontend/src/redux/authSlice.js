import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; // adjust the path as needed

// Define initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false, // Add isLoggedIn to the state
};

// Thunks for handling async actions
export const signUpUser = createAsyncThunk('auth/signUpUser', async (userData) => {
  const response = await api.post('/auth/signup', userData); // correct usage
  return response.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  const response = await api.post('/auth/login', userData); // correct usage
  return response.data;
});

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false; // Set isLoggedIn to false on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true; // Set isLoggedIn to true after successful signup
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true; // Set isLoggedIn to true after successful login
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoggedIn = false; // Set isLoggedIn to false if signup fails
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false; // Set isLoggedIn to false if login fails
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
