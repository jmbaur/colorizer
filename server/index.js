require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const app = express();
const port = process.env.SERVER_PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

const io = socket(server);

io.on("connection", socket => {
  socket.on("line", data => {
    io.sockets.emit("line", data);
  });
});
