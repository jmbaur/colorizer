const Lines = require("../models/Line.js");

module.exports = {
  addLine: async (req, res) => {
    const existingLineCollection = await Lines.findOne({
      name: req.body.name,
      id: req.body.id,
      room: req.body.room
    });

    if (existingLineCollection) {
      existingLineCollection.lines.push(req.body.line);
      existingLineCollection.save();
    } else {
      const newLineCollection = new Lines({
        id: req.body.id,
        name: req.body.name,
        room: req.body.room,
        lines: [req.body.line]
      });
      newLineCollection.save();
    }

    res.sendStatus(200);
  },
  getLines: async (req, res) => {
    const roomLines = await Lines.find({ room: req.query.room });
    let reducedRoomLines = [];
    roomLines.forEach(collection => {
      reducedRoomLines.push(...collection.lines);
    });
    res.status(200).send(reducedRoomLines);
  },
  clear: async room => {
    await Lines.deleteOne({ room });
  }
};
