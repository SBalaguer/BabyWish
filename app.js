"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const connectMongo = require("connect-mongo");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const serveFavicon = require("serve-favicon");
const bindUserToViewLocals = require("./middleware/bind-user-to-view-locals.js");
const passportConfigure = require("./passport-configuration.js");

// IMPORT ROUTERS HERE
const indexRouter = require("./routes/index");
const authenticationRouter = require("./routes/authentication");
const userApiRouter = require("./routes/api/userApi");
const wishListApiRouter = require("./routes/api/wishListApi");
const productApiRouter = require("./routes/api/productsApi");
const checkoutApiRouter = require("./routes/api/checkoutApi");
const shoppingCartApiRouter = require("./routes/api/shoppingCartApi");
const supplierApiRouter = require("./routes/api/supplierApi");
const app = express();

// ROUTEGUARD
const routeGuard = require("./middleware/route-guard");

app.use(express.static(join(__dirname, "client/build")));
app.use(serveFavicon(join(__dirname, "client/build/favicon.ico")));

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
); // ADDED THIS TO SEE IF I GET REQ.BODY
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bindUserToViewLocals);

// DEFINE PATH ROUTES HERE
app.use("/authentication", authenticationRouter);
app.use("/api/user", userApiRouter);
app.use("/api/wishlist", wishListApiRouter);
app.use("/api/products", productApiRouter);
app.use("/api/checkout", checkoutApiRouter);
app.use("/api/shopping-cart", shoppingCartApiRouter);
app.use("/api/supplier", supplierApiRouter);
app.use("/api", indexRouter);
app.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "client/build/index.html"));
});

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
