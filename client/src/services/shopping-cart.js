import axios from "axios";

export const addToShoppingCart = async (
  wishlistId,
  gifterID,
  productID,
  amountBought
) => {
  try {
    const response = await axios.post(`/api/shopping-cart/add/${wishlistId}`, {
      gifterID,
      productID,
      amountBought
    });
    return response.data.newShoppingCart;
  } catch (error) {
    throw error;
  }
};

export const checkIfShoppingCart = async (wishlistId, gifterID) => {
  try {
    const response = await axios.get(
      `/api/shopping-cart/carts/${gifterID}/${wishlistId}`
    );
    return response.data.shoppingCart;
  } catch (error) {
    throw error;
  }
};
