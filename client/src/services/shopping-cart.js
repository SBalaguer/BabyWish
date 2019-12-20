import axios from "axios";

export const createShoppingCart = async (
  wishlistID,
  gifterID,
  productID,
  amountBought
) => {
  try {
    const response = await axios.post(`/api/shopping-cart/add/${wishlistID}`, {
      gifterID,
      productID,
      amountBought
    });
    return response.data.newShoppingCart;
  } catch (error) {
    throw error;
  }
};

export const addToShoppingCart = async (
  shoppingCartID,
  productID,
  amountBought
) => {
  try {
    const response = await axios.patch(
      `/api/shopping-cart/edit/${shoppingCartID}`,
      {
        productID,
        amountBought
      }
    );
    // console.log(response.data);
    return response.data.shoppingCart;
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

export const deleteShoppingcCart = async shoppingCartID => {
  try {
    await axios.delete(`/api/shopping-cart/delete/${shoppingCartID}`);
  } catch (error) {
    throw error;
  }
};
