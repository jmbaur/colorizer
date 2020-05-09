const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  room: String,
  color: String,
  thickness: Number
});

module.exports = mongoose.model("users", UserSchema);
