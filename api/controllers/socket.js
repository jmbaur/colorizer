const Users = require("../models/User.js");
// let users = [];

module.exports = {
  getRoom: async (req, res) => {
    const users = await Users.find({ room: req.query.room });
    res.status(200).send(users);
  }
};
