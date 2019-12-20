const { Router } = require('express');
const routeGuard = require('./../../middleware/route-guard');
const wishListApiRouter = new Router();
const WishList = require('./../../models/wishList');
const User = require('./../../models/user');

wishListApiRouter.get('/user/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const wishListByUser = await WishList.find({ userId: id }).exec();
    // wishListByUser = wishListByUser.
    res.json({ wishListByUser });
  } catch (error) {
    next(error);
  }
});

// CREATE WISHLIST WITH /api/wishlist/create/ - user id -

wishListApiRouter.post('/create/:id', async (req, res, next) => {
  const userId = req.params.id;
  const name = req.body.name;
  try {
    const userIsTrue = await User.findById(userId).exec();
    if (!userIsTrue) throw new Error("There's no user with that email.");
    const newWishList = await WishList.create({
      name,
      userId
    });
    const wishListId = newWishList._id;
    const idString = newWishList._id.toString();
    const wishListLocator =
      'BW-' + idString.substring(idString.length - 5, idString.length);
    const wishListWithId = await WishList.findByIdAndUpdate(wishListId, {
      locator: wishListLocator
    });
    res.json({ wishListWithId });
  } catch (error) {
    // console.log('error in wishlist api: ' + error);
    next(error);
  }
});

// GET WITH WISHLIST ID

wishListApiRouter.get('/:id', async (req, res, next) => {
  const wishListId = req.params.id;
  try {
    const wishList = await WishList.findById(wishListId)
      .populate('products.productId')
      .exec();
    res.json({ wishList });
  } catch (error) {
    next(error);
  }
});

// ADD PRODUCT WITH WISHLIST ID - FROM PARENT SIDE

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
      if (prod.productId == prodId) {
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
    const wishListById = await WishList.findById(id)
      .populate('products.productId')
      .exec();
    const prodsArray = wishListById.products; // ?? WHY DIFFERENT THAN LINE 12 ??
    for (let prod of prodsArray) {
      if (prod._id == prodId) {
        const indexToSplice = prodsArray.indexOf(prod);
        prodsArray.splice(indexToSplice, 1);
      }
    }

    await WishList.findByIdAndUpdate(id, {
      products: prodsArray
    });

    //we have to look again the wishlist because mongoose does not return an updated wishlist with find by id and update
    //Therefore we do not need tthis resposne, we will look up again in the front side.
    res.json({});
  } catch (error) {
    next(error);
  }
});

//DELETE AN ENTIRE WISHLIST

wishListApiRouter.delete('/delete/:id', async (req, res, next) => {
  const wishListId = req.params.id;
  try {
    await WishList.findByIdAndRemove(wishListId).exec();
    res.json({});
  } catch (error) {
    next(error);
  }
});

// GET IWHSLIST BY LOCATOR

wishListApiRouter.get('/locate/:id', async (req, res, next) => {
  const lookFor = req.params.id;
  try {
    const wishList = await WishList.find({ locator: lookFor }).exec();
    res.json({ wishList });
  } catch (error) {
    next(error);
  }
});

module.exports = wishListApiRouter;
