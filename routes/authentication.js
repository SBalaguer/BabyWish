'use strict';

const { Router } = require('express');

const passport = require('passport');

const router = new Router();

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in'),
  (req, res, next) => {
    const user = req.user;
    res.json({ user });
  }
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.json({ user: {} });
});

// LEOS CHANGES FOR FACEBOOK LOGIN - ATTENTION

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/sign-up'
  })
);

router.get('/facebook', passport.authenticate('facebook'), (req, res, next) => {
  const user = req.user;
  res.json({ user });
});
// END OF CHANGES

module.exports = router;
