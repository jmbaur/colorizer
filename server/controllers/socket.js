const User = require("../models/User.js");
// let users = [];

module.exports = {
  // adds a new user or modifies an existing user
  addUser: async user => {
    // const index = users.findIndex(el => el.id === user.id);
    // if (index === -1) {
    //   users.push(user);
    // } else {
    //   users.splice(index, 1, user);
    // }

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
  getRoomUsers: async room => {
    // const users = await User.find({ room: room });
    // console.log("USERS", users);
    // return users.filter(el => el.room === room);
  },
  deleteUser: async user => {
    const status = await User.deleteOne({ id: user.id });
    if (status.deletedCount !== 1) console.log("Could not delete user");

    const users = await User.find({ room: user.room });
    console.log("USERS", users);
  },
  getRoom: async (req, res) => {
    const users = await User.find({ room: req.query.room });
    res.status(200).send(users);
  }
};
