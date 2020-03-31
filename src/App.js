import React from "react";
import Canvas from "./components/Canvas/Canvas.js";
import Toolbar from "./components/Toolbar/Toolbar";
import axios from "axios";
import "./App.css";

function App() {
  React.useEffect(() => {
    axios.get("http://localhost:8000/").then(res => console.log(res.data));
  });
  return (
    <div className="App">
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default App;
