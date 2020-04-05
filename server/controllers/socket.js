const User = require("../models/User.js");
// let users = [];

module.exports = {
  // adds a new user or modifies an existing user
  addUser: async user => {
    // mongoDB
    const existingUser = await User.find({ id: user.id });
    if (existingUser.length) return;

    const dbUser = new User({
      id: user.id,
      name: user.name,
      room: user.room,
      color: user.color,
      thickness: user.thickness
    });

    try {
      const savedUser = await dbUser.save();
    } catch (err) {
      console.log("INSERT ERROR:", err);
    }

    const users = await User.find({ room: user.room });
    console.log("USERS", users);
  },
  getRoom: async (req, res) => {
    const users = await User.find({ room: req.query.room });
    res.status(200).send(users);
  },
  deleteUser: async user => {
    const status = await User.deleteOne({ id: user.id });
    if (status.deletedCount !== 1) console.log("Could not delete user");

    const users = await User.find({ room: user.room });
    console.log("USERS", users);
  }
};
