import axios from 'axios';

export const signIn = async user => {
  try {
    const response = await axios.post('/api/supplier/sign-in', user);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async newUser => {
  // console.log(newUser);
  try {
    const response = await axios.post('/api/supplier/create', newUser);
    return response.data.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
