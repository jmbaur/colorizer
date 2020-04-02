import React from "react";
import socketIOClient from "socket.io-client";
import { StateProvider } from "./store.js";
import Canvas from "./components/Canvas/Canvas.js";
import Toolbar from "./components/Toolbar/Toolbar";
import "./App.css";

const socket = socketIOClient("http://localhost:8000/");

function App() {
  return (
    <div className='App'>
    <StateProvider>
      <Toolbar socket={socket} />
      <Canvas socket={socket} />
    </StateProvider>
    </div>
  );
}

export default App;
