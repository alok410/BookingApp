import api from './api';

// Function for user signup
export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Function for user login
export const loginUser = async (userData) => {
  try {
    console.log("userData")
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
