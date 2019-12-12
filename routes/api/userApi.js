const { Router } = require("express");
const routeGuard = require("./../../middleware/route-guard");
const userApiRouter = new Router();
const User = require("./../../models/user");
const bcryptjs = require("bcryptjs");

const passport = require("passport");
// GET SINGLE USER INFO

userApiRouter.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const userInfo = await User.findById(userId).exec();
    res.json({ userInfo });
  } catch (error) {
    throw error;
  }
});

// GET ALL USERS

userApiRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find().exec();
    res.json({ allUsers });
  } catch (error) {
    throw error;
  }
});

// UPDATE USER - WITH ROUTEGUARD not now

userApiRouter.patch("/edit/:id", async (req, res, next) => {
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
    const result = await User.findByIdAndUpdate(userId, {
      ...(name ? { name } : {}),
      ...(dueDate ? { dueDate } : {}),
      ...(firstBaby ? { firstBaby } : {}),
      ...(address ? { address } : {}),
      ...(babyGender ? { babyGender } : {}),
      ...(pictureUrl ? { pictureUrl } : {})
    }).exec();
    res.json({ result });
  } catch (error) {
    throw error;
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

module.exports = userApiRouter;
