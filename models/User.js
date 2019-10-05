const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String },
  usertype: { type: String, required: true }, // passenger, driver, admin
  phone: { type: String, required: true } //
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = {
  UserSchema,
  User
};
