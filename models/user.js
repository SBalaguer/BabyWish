"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHash: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "expecting", "parent", "gifter"],
    default: "gifter"
  },
  dueDate: {
    type: Date
  },
  firstBaby: {
    type: Boolean
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  babyGender: {
    type: String,
    enum: [
      "singleBoy",
      "singleGirl",
      "twinBoys",
      "twinGirls",
      "twinMix",
      "neutral"
    ],
    default: "neutral"
  },
  pictureUrl: {
    type: String,
    default: "https://icon-library.net/images/baby-icon/baby-icon-14.jpg"
  }
});

module.exports = mongoose.model("User", schema);
