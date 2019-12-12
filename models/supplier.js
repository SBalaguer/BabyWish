'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  shipFrom: {
    type: String
  },
  iban: {
    type: String
  },
  deliveryEtaInDays: {
    type: Number
 
});

module.exports = mongoose.model('Product', schema);
