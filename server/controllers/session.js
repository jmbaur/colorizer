const User = require("../models/User.js");
const hri = require("human-readable-ids").hri;
const randColor = require("../utils/randColor.js");

module.exports = {
  setUser: async (req, res) => {
    // set user session
    req.session.user = {
      color: randColor(),
      thickness: "3",
      name: req.body.name,
      id: req.session.id
    };
    if (req.body.newRoom) {
      req.session.user.room = hri.random();
    } else {
      req.session.user.room = req.body.room;
    }

    // add user to database if does not exist, change user if does exist
    const { id, name, color, thickness, room } = req.session.user;
    const newUser = new User({ id, name, color, thickness, room });

    const status = await User.deleteOne({ id: id });
    if (!status.deletedCount) {
      newUser.save();
    } else {
      newUser.save();
    }

    // send user session back
    res.status(200).send(req.session.user);
  },
  changeUser: async (req, res) => {
    const { name, color, thickness, room } = req.body;
    // find user in DB by ID (unique)
    const user = await User.findOne({ id: req.session.user.id });

    // change the user session
    if (name) {
      req.session.user.name = name;
      user.name = name;
    }
    if (color) {
      req.session.user.color = color;
      user.color = color;
    }
    if (thickness) {
      req.session.user.thickness = req.body.thickness;
      user.thickness = thickness;
    }
    if (!room) {
      req.session.user.room = undefined;
      user.room = undefined;
    }

    // save user back into DB
    await user.save();

    // send user session back
    res.status(200).send(req.session.user);
  },
  getUser: (req, res) => {
    // send user session back
    res.status(200).send(req.session.user);
  },
  removeUser: async (req, res) => {
    const status = await User.deleteOne({ id: req.body.user.id });
    if (status.deletedCount) {
      res.sendStatus(200);
    } else res.sendStatus(404);
  }
};
