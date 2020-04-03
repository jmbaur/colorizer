const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  room: String,
  color: String,
  thickness: Number
});

const RoomSchema = mongoose.Schema({
  room: String,
  users: [UserSchema]
});

module.exports = mongoose.model("Rooms", RoomSchema);
