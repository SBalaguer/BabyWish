const { Router } = require("express");
const shoppingCartRouter = new Router();
const ShoppingCart = require("./../../models/shoppingCart");

//CHECK IF THERE IS A SHOPPING CART FOR THAT USER AND THAT WISHLIST
shoppingCartRouter.get(
  "/carts/:gifterID/:wishlistID",
  async (req, res, next) => {
    //GifterID here refers to the gifter ID
    //wishlistID refers to the wishlistID
    try {
      const gifterID = req.params.gifterID;
      const wishListID = req.params.wishlistID;
      const shoppingCart = await ShoppingCart.findOne({
        wishlist: wishListID,
        gifterId: gifterID
      });
      res.json({ shoppingCart });
    } catch (error) {
      next(error);
    }
  }
);

//CREATE A NEW SHOPPING CART
shoppingCartRouter.post("/add/:id", async (req, res, next) => {
  //things I need: Wishlist ID, ID of gifter, ID of product
  //ID here refers to the wishlist ID
  //Gifter ID will come from the req.body
  //Product ID will come from the req.body
  //Amount Bought will come from the req.body
  try {
    const wishListID = req.params.id;
    const { gifterID, productID, amountBought } = req.body;
    const product = {
      productId: productID,
      amountBought: amountBought
    };
    const newShoppingCart = await ShoppingCart.create({
      wishlist: wishListID,
      gifterId: gifterID,
      products: product
    });
    res.json({ newShoppingCart });
  } catch (error) {
    next(error);
  }
});

//PATCH AN EXISTING SHOPPING CART
//ADD A NEW ITEM
shoppingCartRouter.patch("/edit/:id", async (req, res, next) => {
  //ID here refers to the shoppingCart ID
  //Gifter ID will come from the req.body
  //Product ID will come from the req.body
  //Amount Bought will come from the req.body
  //I NEED THE SHOPPING CART ID!
  const shoppingCartID = req.params.id;
  const { productID, amountBought } = req.body;
  const product = {
    productId: productID,
    amountBought: amountBought
  };
  try {
    const shoppingCart = await ShoppingCart.findByIdAndUpdate(shoppingCartID, {
      // ...(product ? { product } : {})
      $push: { products: product }
    });
    res.json({ shoppingCart });
  } catch (error) {
    //console.log(error);
    next(error);
  }
});

//UPDATE THE AMOUNT BOUGHT
shoppingCartRouter.patch("/edit/:id/:productID", async (req, res, next) => {
  //ID here refers to the shoppingCart ID
  //Gifter ID will come from the req.body
  //Product ID will come from the req.body
  //Amount Bought will come from the req.body
  //I NEED THE SHOPPING CART ID!
  const shoppingCartID = req.params.id;
  const productID = req.params.productID;
  const { amountBought } = req.body;
  const product = {
    productId: productID,
    amountBought: amountBought
  };
  try {
    const shoppingCart = await ShoppingCart.findByIdAndUpdate(shoppingCartID, {
      $push: { products: product }
    });
    res.json({ shoppingCart });
  } catch (error) {
    //console.log(error);
    next(error);
  }
});

//DELETE A SHOPPING CART
shoppingCartRouter.delete("/delete/:id/", async (req, res, next) => {
  //ID here refers to the shoppingCart ID
  const shoppingCartID = req.params.id;
  try {
    await ShoppingCart.findByIdAndRemove(shoppingCartID);
    res.json({});
  } catch (error) {
    //console.log(error);
    next(error);
  }
});

module.exports = shoppingCartRouter;
