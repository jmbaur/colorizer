import React from "react";
import Canvas from "./components/Canvas.js";
import Toolbar from './components/Toolbar/Toolbar';
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <Toolbar/>
      </div>
      <Canvas />
    </div>
  );
}

export default App;
