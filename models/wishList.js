"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      productId: mongoose.Types.ObjectId,
      ref: "Product",
      amountWanted: Number,
      amountBought: Number
    }
  ]
});

module.exports = mongoose.model("WishList", schema);
