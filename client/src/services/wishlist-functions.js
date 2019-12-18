import axios from "axios";

// this will likely return the whole object
export const getWishlistById = async id => {
  try {
    const response = await axios.get(`/api/wishlist/${id}`);
    return response.data.wishList;
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
    const response = await axios.post(`/api/wishlist/create/${id}`, { name });
    return response.data.newWishList;
  } catch (error) {
    throw error;
  }
};

export const addProductToWishlist = async (id, productId, amountWanted) => {
  try {
    const response = await axios.patch(`/api/wishlist/${id}`, {
      productId,
      amountWanted
    });
    return response.data.updateWishList;
  } catch (error) {
    throw error;
  }
};

export const removeProductInWishlist = async (wishlistId, productId) => {
  try {
    const response = await axios.patch(`/api/wishlist/remove/${wishlistId}`, {
      productId
    });
    return response.data.updateWishList;
  } catch (error) {
    throw error;
  }
};

export const deleteWishlist = async wishlistId => {
  try {
    const response = await axios.delete(`/api/wishlist/delete/${wishlistId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBoughtAmountWL = async (wishlistId, productId, amount) => {
  try {
    const response = await axios.patch(`/api/wishlist/gifter/${wishlistId}`, {
      productId,
      amount
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
