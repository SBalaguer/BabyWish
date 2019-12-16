import axios from 'axios';

export const signUp = async newUser => {
  try {
    const response = await axios.post('/api/user/create', newUser);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async user => {
  try {
    const response = await axios.post('/authentication/sign-in', user);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await axios.post('/authentication/sign-out');
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const isUserLoggedIn = async () => {
  try {
    const response = await axios.get('/api/user/check-user-logged');
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const facebookLogin = async req => {
  console.log('facebook service ran');
  try {
    const response = await axios.post('/api/user/facebook', req);
    console.log('facebook post api run and the response is: \n');
    console.dir(response.data.response);
    return response.data.response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
