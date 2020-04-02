const hri = require("human-readable-ids").hri;

module.exports = {
  init: (req, res) => {
    const { name, room, newRoom } = req.body;
    req.session.user = {
      color:
        "#" +
        (function co(lor) {
          return (lor += [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            "a",
            "b",
            "c",
            "d",
            "e",
            "f"
          ][Math.floor(Math.random() * 16)]) && lor.length == 6
            ? lor
            : co(lor);
        })(""),
      thickness: "3",
      name
    };
    if (newRoom) {
      req.session.user.room = hri.random();
    } else {
      req.session.user.room = room;
    }
    res.status(200).send(req.session.user);
  },
  setUser: (req, res) => {
    const { name, color, thickness } = req.body;
    if (name) req.session.user.name = name;
    if (color) req.session.user.color = color;
    if (thickness) req.session.user.thickness = thickness;
    res.status(200).send(req.session.user);
  }
};
