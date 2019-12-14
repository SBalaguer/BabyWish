"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "Product"
      },
      amountWanted: Number,
      amountBought: Number
    }
  ]
});

module.exports = mongoose.model("WishList", schema);
