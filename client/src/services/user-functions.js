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
  try {
    const response = await axios.post('/api/user/facebook', req);
    return response.data.response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const findWishList = async id => {
  try {
    const response = await axios.get(`/api/wishlist/user/${id}`);
    console.dir(response);
    return response.data.wishListByUser;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get('/api/user/');
    return response.data.allUsers;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async id => {
  try {
    const response = await axios.post(`/api/user/delete/${id}`);
    return {};
  } catch (error) {
    throw error;
  }
};
