const mongoose = require("mongoose");

const LineSchema = mongoose.Schema({
  id: String,
  name: String,
  room: String,
  lines: [
    {
      points: [
        {
          x: Number,
          y: Number
        }
      ],
      color: String,
      thickness: Number
    }
  ]
});

module.exports = mongoose.model("lines", LineSchema);
