const { Router } = require('express');
const routeGuard = require('./../../middleware/route-guard');
const wishListApiRouter = new Router();
const WishList = require('./../../models/wishList');
const User = require('./../../models/user');

// ( probably USELESS ) - GET WISHLIST BY USER ID - THIS RETURNS ONLY THE ARRAY OF WISHLIST PRODUCTS

wishListApiRouter.get('/user/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const wishListByUser = await WishList.find({ userId: id }).exec();
    console.log('this is wishlistbyuser: \n' + wishListByUser[0].products);
    const wishListProds = wishListByUser[0].products;
    console.log('this is wishlistprods: \n' + wishListProds);
    res.json({ wishListProds });
  } catch (error) {
    next(error);
  }
});

// CREATE WISHLIST WITH /api/wishlist/create/ - user id -

wishListApiRouter.post('/create/:id', async (req, res, next) => {
  const userId = req.params.id;
  try {
    const userIsTrue = await User.findById(userId).exec();
    console.log(userIsTrue);
    if (userIsTrue) {
      const newWishList = await WishList.create({
        userId
      });
      res.json({ newWishList });
    } else {
      res.send('user not found');
    }
  } catch (error) {
    next(error);
  }
});

// GET WITH WISHLIST ID

wishListApiRouter.get('/:id', async (req, res, next) => {
  const wishListId = req.params.id;
  try {
    const wholeWishList = await WishList.findById(wishListId).exec();
    res.json({ wholeWishList });
  } catch (error) {
    next(error);
  }
});

// ADD PRODUCT WITH WISHLIST ID

wishListApiRouter.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const prodId = req.body.productId; //  in the req.body FOR THE moment
  const newItem = {
    productId: prodId,
    amountWanted: req.body.amountWanted,
    amountBought: 0
  };
  try {
    const updateWishList = await WishList.findByIdAndUpdate(id, {
      $push: { products: newItem }
    });
    res.json({ updateWishList });
  } catch (error) {
    next(error);
  }
});

// FINDS WISHLIST BY WISHLIST ID
// PATCH WITH WISHLIST ID FROM GIFTER SIDE
// UPDATES AMOUNT BOUGHT OF PRODUCT WITH PRODUCT ID

wishListApiRouter.patch('/gifter/:id', async (req, res, next) => {
  const id = req.params.id;
  const prodId = req.body.productId; //  in the req.body FOR THE moment
  const amount = req.body.amount; // we need to pass the number of itmes bought in the req.body
  try {
    const wishListById = await WishList.findById(id).exec();
    const prodsArray = wishListById.products; // ?? WHY DIFFERENT THAN LINE 12 ??
    for (let prod of prodsArray) {
      if (prod.productId === prodId) {
        prod.amountBought = parseInt(prod.amountBought) + parseInt(amount);
      }
    }
    const updateWishList = await WishList.findByIdAndUpdate(id, {
      products: prodsArray
    });
    res.json({ updateWishList });
  } catch (error) {
    next(error);
  }
});

// TO DELETE ITEM FROM WISHLIST FROM PARENT SIDE

wishListApiRouter.patch('/remove/:id', async (req, res, next) => {
  const id = req.params.id;
  const prodId = req.body.productId; //  in the req.body FOR THE moment
  try {
    const wishListById = await WishList.findById(id).exec();
    const prodsArray = wishListById.products; // ?? WHY DIFFERENT THAN LINE 12 ??
    for (let prod of prodsArray) {
      if (prod.productId === prodId) {
        const indexToSplice = prodsArray.indexOf(prod);
        prodsArray.splice(indexToSplice, 1);
      }
    }
    const updateWishList = await WishList.findByIdAndUpdate(id, {
      products: prodsArray
    });
    res.json({ updateWishList });
  } catch (error) {
    next(error);
  }
});

module.exports = wishListApiRouter;