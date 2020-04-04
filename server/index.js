"use strict";
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const { init, setUser, getUser } = require("./controllers/session.js");
const {
  addToRoom,
  removeFromRoom,
  getRoomUsers,
  modifyUserInRoom
} = require("./controllers/socket.js");

const app = express();

// connect to DB
mongoose.connect(
  process.env.CONN_STR,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    preflightContinue: true,
    credentials: true
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
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

const sendRoom = room => {
  io.to(room).emit("room", {
    room: room,
    users: getRoomUsers(room)
  });
  console.log("ROOM", getRoomUsers(room));
};

io.on("connection", socket => {
  socket.on("hi", () => socket.emit("hi", "hi"));

  socket.on("join", user => {
    socket.join(user.room);
    addToRoom(user);

    // send users and room info
    sendRoom(user.room);
  });

  // listen for user changes
  socket.on("change", user => {
    addToRoom(user);
    sendRoom(user.room);
  });

  // listen for request for all users in room
  socket.on("room", user => {
    sendRoom(user.room);
  });

  // listen for leave message
  socket.on("leave", user => {
    removeFromRoom(user);
    socket.leave(user.room);
    sendRoom(user.room);
  });

  // listen for drawing message
  socket.on("draw", data => {
    io.to(data.room).emit("draw", data.data);
  });
});
