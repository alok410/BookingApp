import api from './api';

export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (userData) => {
  try {
    console.log("userData")
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
