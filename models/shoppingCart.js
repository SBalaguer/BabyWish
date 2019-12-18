"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  gifterId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  wishlist: { type: mongoose.Types.ObjectId, ref: "Wishlist" },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "Product"
      },
      amountBought: Number
    }
  ]
});

module.exports = mongoose.model("ShoppingCart", schema);
