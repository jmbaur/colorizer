const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  room: String,
  color: String,
  thickness: Number
});

module.exports = mongoose.model("Users", UserSchema);
