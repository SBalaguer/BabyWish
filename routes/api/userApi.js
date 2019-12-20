const { Router } = require('express');
const routeGuard = require('./../../middleware/route-guard');
const userApiRouter = new Router();
const User = require('./../../models/user');
const Supplier = require('./../../models/supplier');
const bcryptjs = require('bcryptjs');

const passport = require('passport');

//CHECK IF THERE IS A USER LOGGEDIN
userApiRouter.get('/check-user-logged', async (req, res, next) => {
  // console.log('this is req.user:\n' + req.user);
  const userId = req.user;
  try {
    let user = await User.findById(userId).exec();
    // console.log(user);
    if (user) {
      res.json({ user });
    } else {
      user = await Supplier.findById(userId).exec();
      // console.log('else run and user is:\n' + user);
      res.json({ user });
    }
  } catch (error) {
    next(error);
  }
});

// GET SINGLE USER INFO

userApiRouter.get('/:id', async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).exec();
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// GET ALL USERS

userApiRouter.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.find().exec();
    res.json({ allUsers });
  } catch (error) {
    next(error);
  }
});

// UPDATE USER - WITH ROUTEGUARD not now

userApiRouter.patch('/edit/:id', async (req, res, next) => {
  const userId = req.params.id;
  try {
    const {
      name,
      dueDate,
      firstBaby,
      address,
      phoneNumber,
      babyGender,
      pictureUrl
    } = req.body;
    // const imgUrl = req.file.url; -- not up for now
    const user = await User.findByIdAndUpdate(userId, {
      ...(name ? { name } : {}),
      ...(dueDate ? { dueDate } : {}),
      ...(firstBaby ? { firstBaby } : {}),
      ...(address ? { address } : {}),
      ...(phoneNumber ? { phoneNumber } : {}),
      ...(babyGender ? { babyGender } : {}),
      ...(pictureUrl ? { pictureUrl } : {})
    }).exec();
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

userApiRouter.post(
  '/create',
  passport.authenticate('local-sign-up'),
  (req, res) => {
    const user = req.user;
    res.json({ user });
  }
);

userApiRouter.post('/facebook', async (req, res, next) => {
  const reqEmail = req.body.email;
  const reqPic = req.body.picture.data.url;
  const reqName = req.body.name;
  const response = await User.findOne({ email: reqEmail }).exec();
  console.log(response);
  if (response !== null) {
    req.session.user = response._id;
    res.json({ response });
  } else {
    const newUser = await User.create({
      email: reqEmail,
      pictureUrl: reqPic,
      name: reqName
    });
    req.session.user = newUser._id;
    res.json({ newUser });
  }
});

// ATTENTION ADD PASSWORD CHANGE PATCH METHOD HERE
// AND DELETE

userApiRouter.post('/delete/:id', async (req, res, next) => {
  const idToDelete = req.params.id;
  const deletedUser = await User.findByIdAndDelete(idToDelete);
  res.json({ deletedUser });
});

const multerMiddleware = require('./../../middleware/cloudinary');

// UPLOADS PICTURE AND CROPS IT TO A CIRCLE AND TRANSFORMS IT TO PNG
userApiRouter.post(
  '/upload',
  multerMiddleware.single('pictureUrl'),
  async (req, res, next) => {
    const toReturn = req.file.url;
    const toAdd = 'w_200,h_200,c_crop,g_face,r_max/w_200';
    let link = toReturn.split('/');

    const indexToSplice = link.indexOf('upload') + 1;
    link.splice(indexToSplice, 0, toAdd);
    let changeLast = link[link.length - 1].split('.');
    changeLast.splice(1, 1, 'png');
    changeLast = changeLast.join('.');
    link.splice(link.length - 1, 1, changeLast);
    link = link.join('/');

    res.json({ link });
  }
);

module.exports = userApiRouter;
