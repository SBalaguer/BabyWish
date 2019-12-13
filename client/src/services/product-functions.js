import axios from "axios";

export const listProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data.products;
  } catch (error) {
    throw error;
  }
};

export const singleProduct = async id => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data.product;
  } catch (error) {
    throw error;
  }
};
