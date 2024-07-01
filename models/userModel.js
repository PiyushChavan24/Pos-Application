/** @format */

const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = mongoose.Schema(
 {
  name: { type: String, required: true },
  userId: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
 },
 { timestamps: true }
);

const userModel1 = mongoose.model("user", userSchema);

module.exports = userModel1;
("");
