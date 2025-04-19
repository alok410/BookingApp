import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api'; 

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false, 
};

export const signUpUser = createAsyncThunk('auth/signUpUser', async (userData) => {
  const response = await api.post('/auth/signup', userData); 
  return response.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  const response = await api.post('/auth/login', userData); 
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true; 
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoggedIn = false; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
