'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      productId: String, // doing this for testing
      // productId: mongoose.Types.ObjectId, //ATTENTION
      // ref: "Product",
      amountWanted: Number,
      amountBought: Number
    }
  ]
});

module.exports = mongoose.model('WishList', schema);
