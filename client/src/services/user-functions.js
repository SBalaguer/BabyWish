import axios from 'axios';

export const signUp = async newUser => {
  try {
    const response = await axios.post('/api/user/create', newUser);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};
