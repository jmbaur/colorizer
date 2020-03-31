const socket = require("socket.io");
const hri = require("human-readable-ids").hri;

module.exports = {
  init: (req, res) => {
    if (!req.session.user) {
      req.session.user = {
        name: "Anonymous",
        color: "#000000",
        room: hri.random()
      };
      console.log("new user");
    } else {
      console.log("existing user");
    }
    console.log(req.session, req.sessionID);
    res.status(200).send(req.session.user);
  },
  setName: (req, res) => {
    const { name } = req.body;
    if (!req.session.user.name) {
      req.session.user.name = name;
    }
    res.status(200).send(req.session.user);
  }
};
