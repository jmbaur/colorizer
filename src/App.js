import React from "react";
import { StateProvider } from "./store.js";
import Canvas from "./components/Canvas/Canvas.js";
import Toolbar from "./components/Toolbar/Toolbar";
import "./App.css";

function App() {
  return (
    <div className='App'>
    <StateProvider>
      <Toolbar />
      <Canvas />
    </StateProvider>
    </div>
  );
}

export default App;
