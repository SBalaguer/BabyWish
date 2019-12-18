import axios from 'axios';

export const listProducts = async () => {
  try {
    const response = await axios.get('/api/products');
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

export const addFromAmazon = async asin => {
  try {
    const newProduct = await axios.get(
      `http://webservices.amazon.com/onca/xml?ItemId=${asin}&AWSAccessKeyId=AKIAEXAMPLEFWR4TJ7ZQ`
    );
    console.log(newProduct);
  } catch (error) {
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
