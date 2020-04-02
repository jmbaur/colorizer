"use strict";
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const cors = require("cors");

const { init, setUser, getUser } = require("./controllers/session.js");
const {
  addToRoom,
  removeFromRoom,
  getRoomUsers
} = require("./controllers/socket.js");

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    preflightContinue: true,
    credentials: true
  })
);
const SECRET = process.env.SESSION_SECRET || "secret";
app.use(
  session({
    secret: SECRET,
    resave: false,
    sameSite: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

const port = process.env.SERVER_PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// endpoints
app.post("/api/init", init);
app.put("/api/setUser", setUser);
app.get("/api/getUser", getUser);

const io = socket(server);

io.on("connection", socket => {
  socket.on("join", user => {
    if (user.oldRoom) socket.leave(user.oldRoom);
    if (user.room !== user.oldRoom) {
      socket.join(user.room);
      addToRoom(user);

      // broadcast when a user connects
      socket.broadcast.to(user.room).emit("room", user.name);

      // send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  // listen for leave message
  socket.on("leave", user => {
    socket.leave(user.room);
  });

  // listen for drawing message
  socket.on("draw", data => {
    console.log(socket.rooms);
  });
});
