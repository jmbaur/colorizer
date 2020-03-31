"use strict";
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const cors = require("cors");

const ctrl = require("./controllers/socket.js");

const app = express();

app.use(cors({ preflightContinue: true, credentials: true }));

const SECRET = process.env.SESSION_SECRET || "secret";
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

const port = process.env.SERVER_PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/api/init", ctrl.init);

const io = socket(server);

io.on("connection", socket => {
  socket.on("join", ({ newRoom, oldRoom }) => {
    if (oldRoom) socket.leave(oldRoom);
    socket.join(newRoom);
  });
  socket.on("draw", ({ room, message }) => {
    socket.broadcast.to(room).emit("draw", message);
  });
});
