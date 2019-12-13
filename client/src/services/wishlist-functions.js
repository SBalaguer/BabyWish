import axios from 'axios';

// this will likely return the whole object
export const getWishlistById = async id => {
  try {
    const response = await axios.get(`/api/wishlist/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getWishlistByUserId = async id => {
  try {
    const response = await axios.get(`/api/wishlist/user/${id}`);
    return response.data.wishListByUser;
  } catch (error) {
    throw error;
  }
};
