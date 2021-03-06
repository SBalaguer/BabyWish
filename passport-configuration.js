'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/user');
const Supplier = require('./models/supplier');
const bcryptjs = require('bcryptjs');

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
  'local-sign-up',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const name = req.body.name;
      const role = req.body.role;
      const dueDate = req.body.dueDate;
      const birthdayDate = req.body.birthdayDate;
      const firstBaby = req.body.firstBaby;
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;
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
            birthdayDate
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          //console.log(error);
          callback(error);
        });
    }
  )
);

passport.use(
  'local-sign-in',
  new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
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
          callback(new Error('WRONG_PASSWORD'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);

// SUPPLIER PASSPORT CONFIG LEO

passport.use(
  'supplier-sign-up',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const name = req.body.name;
      const iban = req.body.iban;
      const shipFrom = req.body.shipFrom;
      const deliveryEtaInDays = req.body.deliveryEtaInDays;
      const phoneNumber = req.body.phoneNumber;
      bcryptjs
        .hash(password, 10)
        .then(hash => {
          return Supplier.create({
            name,
            email,
            passwordHash: hash,
            iban,
            shipFrom,
            deliveryEtaInDays,
            phoneNumber
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          //console.log(error);
          callback(error);
        });
    }
  )
);

passport.use(
  'supplier-sign-in',
  new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
    let user;
    Supplier.findOne({
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
          callback(new Error('WRONG_PASSWORD'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);

// LEOS CHANGES FOR FACEBOOK LOGIN - ATTENTION

// passport.use(
//   'facebook',
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: 'http://localhost:3000/authentication/facebook/callback'
//     },

//     (accessToken, refreshToken, profile, done) => {
//       User.findOrCreate({ facebookID: profile.id }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         done(null, user);
//       });
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: 'http://localhost:3000/authentication/facebook/callback'
//     },
//     function(accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ facebookID: profile.id }, function(err, user) {
//         if (err) {
//           return done(err);
//         }
//         done(null, user);
//       });
//     }
//   )
// );
// END OF CHANGES
