import axios from "axios";

export const processPayment = async (token, total) => {
  try {
    const response = await axios.post("/api/checkout", { token, total });
    return response.data.status;
    //this will return success or failure
  } catch (error) {
    throw error;
  }
};
