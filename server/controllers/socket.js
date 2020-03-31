const socket = require("socket.io");
const hri = require("human-readable-ids").hri;

module.exports = {
  getRoom: (req, res) => {
    if (!req.session.room) {
      req.session.room = hri.random();
    }
    res.status(200).send(req.session.room);
  },
  setName: (req, res) => {
    const { name } = req.body;
    console.log(name);
    res.sendStatus(200);
  }
};
