const { Router } = require('express');
const routeGuard = require('./../../middleware/route-guard');
const supplierApiRouter = new Router();
const Supplier = require('./../../models/supplier');
const bcryptjs = require('bcryptjs');

const passport = require('passport');

supplierApiRouter.post(
  '/sign-in',
  passport.authenticate('supplier-sign-in'),
  (req, res, next) => {
    const user = req.user;
    res.json({ user });
  }
);

supplierApiRouter.post(
  '/create',
  passport.authenticate('supplier-sign-up'),
  (req, res) => {
    const user = req.user;
    res.json({ user });
  }
);

module.exports = supplierApiRouter;
