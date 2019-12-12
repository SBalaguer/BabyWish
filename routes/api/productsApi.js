const { Router } = require('express');
const routeGuard = require('./../../middleware/route-guard');
const productsRouter = new Router();
const Product = require('./../../models/products');
const User = require('./../../models/user');

// POST METHOD TO ADD PRODUCTS
// NEED TO THINK OF INTEGRATING WITH AMAZON API OR SUCH

productsRouter.post('/create', async (req, res, next) => {
  const { name, category, price, pictureUrl, availableStock } = req.body;
  //   const newProduct = {
  //     name,
  //     category,
  //     price,
  //     pictureUrl,
  //     availableStock
  //   };
  //   console.log('this is new product: \n' + newProduct);
  //   console.dir(newProduct);
  try {
    const newProductResult = await Product.create({
      name,
      category,
      price,
      pictureUrl,
      availableStock
    });
    res.json({ newProductResult });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = productsRouter;
