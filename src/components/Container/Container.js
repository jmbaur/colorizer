import React from "react";
import socketIOClient from "socket.io-client";
import Canvas from "../Canvas/Canvas.js";
import Toolbar from "../Toolbar/Toolbar.js";

const socket = socketIOClient("http://localhost:8000/");

const Container = () => {
  // need functions here that help with drawing, clearing, undoing, etc.
  return (
    <div>
      <Toolbar socket={socket} />
      <Canvas socket={socket} />
    </div>
  );
};

export default Container;
