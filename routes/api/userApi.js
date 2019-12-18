const { Router } = require("express");
const routeGuard = require("./../../middleware/route-guard");
const userApiRouter = new Router();
const User = require("./../../models/user");
const bcryptjs = require("bcryptjs");

const passport = require("passport");

//CHECK IF THERE IS A USER LOGGEDIN
userApiRouter.get("/check-user-logged", async (req, res, next) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId).exec();
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// GET SINGLE USER INFO

userApiRouter.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).exec();
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// GET ALL USERS

userApiRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find().exec();
    res.json({ allUsers });
  } catch (error) {
    next(error);
  }
});

// UPDATE USER - WITH ROUTEGUARD not now

userApiRouter.patch("/edit/:id", async (req, res, next) => {
  const userId = req.params.id;
  console.dir(req.body);
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
  "/create",
  passport.authenticate("local-sign-up"),
  (req, res) => {
    const user = req.user;
    res.json({ user });
  }
);

userApiRouter.post("/facebook", async (req, res, next) => {
  console.log("api facebook was called with: \n" + req);
  console.dir(req.body);
  const reqEmail = req.body.email;
  const reqPic = req.body.picture.data.url;
  const reqName = req.body.name;
  const response = await User.findOne({ email: reqEmail }).exec();
  console.log(response);
  if (response !== null) {
    console.log("we found an user");
    req.session.user = response._id;
    res.json({ response });
  } else {
    console.log("attempting to create nw user");
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

userApiRouter.post("/delete/:id", async (req, res, next) => {
  const idToDelete = req.params.id;
  const deletedUser = await User.findByIdAndDelete(idToDelete);
  res.json({ deletedUser });
});

const multerMiddleware = require("./../../middleware/cloudinary");

userApiRouter.post(
  "/upload",
  multerMiddleware.single("pictureUrl"),
  async (req, res, next) => {
    console.log(req.file);
    const toReturn = req.file.url;
    res.json({ toReturn });
  }
);

module.exports = userApiRouter;
