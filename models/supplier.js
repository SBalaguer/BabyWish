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
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number
  }
});

module.exports = mongoose.model('Supplier', schema);
