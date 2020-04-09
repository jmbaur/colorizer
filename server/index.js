"use strict";
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const http = require("http");
const https = require("https");

const {
  setUser,
  changeUser,
  getUser,
  removeUser
} = require("./controllers/session.js");
const { getRoom } = require("./controllers/socket.js");
const { addLine, getLines, clear } = require("./controllers/line.js");

const app = express();

// connect to DB
mongoose.connect(
  process.env.CONN_STR,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("connected to DB")
);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: `${
      process.env.NODE_ENV === "production"
        ? process.env.PROD_URL
        : "http://localhost:3000"
    }`,
    preflightContinue: true,
    credentials: true
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    sameSite: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
  })
);

const PORT = process.env.SERVER_PORT || 8080;
const options =
  process.env.NODE_ENV === "production"
    ? {
        key: fs.readFileSync(__dirname + "/../../selfsigned.key"),
        cert: fs.readFileSync(__dirname + "/../../selfsigned.crt")
      }
    : null;

const server =
  process.env.NODE_ENV === "production"
    ? https.createServer(options, app)
    : http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// endpoints
app.post("/api/user", setUser);
app.get("/api/user", getUser);
app.put("/api/user", changeUser);
app.delete("/api/user", removeUser);
app.post("/api/line", addLine);
app.get("/api/line", getLines);
app.get("/api/room", getRoom);

const io = socket(server);

io.on("connection", socket => {
  socket.on("hi", () => socket.emit("hi", "hi"));

  // listen for new users joining room
  socket.on("join", user => {
    socket.join(user.room);
    socket.broadcast
      .to(user.room)
      .emit("room", { type: "addUser", data: { room: user.room } });
  });

  // listen for user changes
  socket.on("change", user => {
    // socket.broadcast.to(user.room).emit("room", { type: "changedUser", data: user });
    // not broadcasting
    io.sockets.to(user.room).emit("room", { type: "changedUser", data: user });
  });

  // listen for user leaving room
  socket.on("leave", user => {
    socket.leave(user.room);
    socket.broadcast
      .to(user.room)
      .emit("room", { type: "removeUser", data: user });
  });

  // listen for drawing message
  socket.on("draw", data => {
    io.to(data.room).emit("draw", data.data);
  });

  socket.on("clear", data => {
    clear(data.room);
    socket.broadcast.to(data.room).emit("clear", data);
  });
});
