import axios from "axios";

export const processPayment = async (token,product) => {
  try {
    const response = await axios.post("/api/checkout", {token, product});
    return response.data.status
    //this will return success or failure
  } catch (error) {
    throw error;
  }
};