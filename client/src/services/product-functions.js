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

// export const addFromAmazon = async asin => {
//   try {
//     const newProduct = await axios.get(
//       `http://webservices.amazon.com/onca/xml?ItemId=${asin}&AWSAccessKeyId=AKIAEXAMPLEFWR4TJ7ZQ`
//     );
//     console.log(newProduct);
//   } catch (error) {
//     throw error;
//   }
// }; // NOT IN USE

export const addProduct = async obj => {
  try {
    const newProduct = await axios.post("/api/products/create", obj);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const createFile = async file => {
  const data = new FormData();

  data.append("pictureUrl", file);
  try {
    const response = await axios.post(`/api/products/upload`, data);
    // console.log('this below is response file');
    console.dir(response);
    return response.data.toReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// // GET PRODUCTS FROM AMAZON
// productsRouter.get('/new-from-amazon/:asin', async (req,res,next) => {
//   const asin = req.params.asin
//   try {
//     http://webservices.amazon.com/onca/xml?${req.asin}
// const newProduct = await Product.
//   } catch (error) {
//     next(error)
//   }
// })
