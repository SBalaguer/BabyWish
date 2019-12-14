import axios from "axios";

// this will likely return the whole object
export const getWishlistById = async id => {
  try {
    const response = await axios.get(`/api/wishlist/${id}`);
    return response.data.wholeWishList.products;
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

export const createWishlist = async (id, name) => {
  try {
    const response = await axios.post(`api/wishlist/create/${id}`, { name });
    return response.data.newWishList;
  } catch (error) {
    throw error;
  }
};

export const addProductToWishlist = async (id, prodId, amountWanted) => {
  try {
    const response = await axios.patch(`api/wishlist/${id}`, {
      prodId,
      amountWanted
    });
    return response.data.newWishlist;
  } catch (error) {
    throw error;
  }
};
