const mongoose = require("mongoose");

const LineSchema = mongoose.Schema({
  id: String,
  name: String,
  room: String,
  lines: [
    [
      {
        x0: Number,
        y0: Number,
        x1: Number,
        y1: Number,
        color: String,
        thickness: Number
      }
    ]
  ]
});

module.exports = mongoose.model("lines", LineSchema);
