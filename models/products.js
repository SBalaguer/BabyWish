'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['diapers', 'trolleys', 'essentials', 'clothes', 'uncategorized'],
    default: 'uncategorized'
  },
  supplierId: {
    type: mongoose.Types.ObjectId
  },
  price: {
    type: Number
  },
  pictureUrl: {
    type: String
  },
  availableStock: {
    type: Number
  }
});

module.exports = mongoose.model('Product', schema);
