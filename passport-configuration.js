"use strict";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");
const bcryptjs = require("bcryptjs");

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  "local-sign-up",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const name = req.body.name;
      const role = req.body.role;
      const dueDate = req.body.dueDate;
      const firstBaby = req.body.firstBaby;
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;
      const babyGender = req.body.babyGender;
      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return User.create({
            name,
            email,
            passwordHash: hash,
            role,
            dueDate,
            firstBaby,
            address,
            phoneNumber,
            babyGender
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  "local-sign-in",
  new LocalStrategy({ usernameField: "email" }, (email, password, callback) => {
    let user;
    User.findOne({
      email
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error("WRONG_PASSWORD"));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);
