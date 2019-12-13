const { Router } = require("express");
const routeGuard = require("./../../middleware/route-guard");
const productsRouter = new Router();
const Product = require("./../../models/products");

// POST METHOD TO ADD PRODUCTS
// NEED TO THINK OF INTEGRATING WITH AMAZON API OR SUCH

productsRouter.post("/create", async (req, res, next) => {
  const { name, category, price, pictureUrl, availableStock } = req.body;
  const newProduct = {
    // ATTENTION - ADD SUPPLIER LATER
    name,
    category,
    price,
    pictureUrl,
    availableStock
  };
  try {
    const newProductResult = await Product.create(newProduct);
    res.json({ newProductResult });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//LIST ALL PRODUCTS IN OUR DB

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.find().exec();
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

//FIND A SPECIFIC PRODUCT GIVEN IT'S ID

productsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id).exec();
    res.json({ product });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
