require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.SERVER_PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

const io = socket(server);

io.on("connection", socket => {
  socket.on("draw", data => {
    console.log(data);
    socket.broadcast.emit("draw", data);
  });
});
