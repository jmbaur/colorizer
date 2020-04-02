const hri = require("human-readable-ids").hri;

module.exports = {
  init: (req, res) => {
    if (!req.session.user) {
      req.session.user = {
        name: `user_${req.sessionID.slice(0, 5)}`,
        color: "#000000",
        thickness: "3",
        room: hri.random()
      };
    }
    res.status(200).send(req.session.user);
  },
  setUser: (req, res) => {
    const { name, color, room, thickness } = req.body;
    if (name) req.session.user.name = name;
    if (color) req.session.user.color = color;
    if (thickness) req.session.user.thickness = thickness;
    if (room) req.session.user.room = room;

    // console.log(req.session.user);
    res.status(200).send(req.session.user);
  }
};
