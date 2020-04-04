const User = require("../models/User.js");
let users = [];

module.exports = {
  // adds a new user or modifies an existing user
  addToRoom: async user => {
    const index = users.findIndex(el => el.id === user.id);
    if (index === -1) {
      users.push(user);
    } else {
      users.splice(index, 1, user);
    }

    // mongoDB
    const dbUser = new User({
      name: user.name,
      room: user.room,
      color: user.color,
      thickness: user.thickness
    });

    try {
      const savedUser = await dbUser.save();
      console.log(savedUser);
    } catch (err) {
      console.log("INSERT ERROR:", err);
    }
  },
  getRoomUsers: room => {
    console.log("USERS", users);
    return users.filter(el => el.room === room);
  },
  removeFromRoom: user => {
    const index = users.findIndex(el => el.id === user.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return users;
  }
};
