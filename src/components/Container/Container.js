import React from "react";
import Canvas from "../Canvas/Canvas.js";
import Toolbar from "../Toolbar/Toolbar.js";
// import { store } from "../../store.js";

const Container = props => {
  const [clear, setClear] = React.useState(false);

  // need functions here that help with drawing, clearing, undoing, etc.
  const clearCanvas = bool => {
    setClear(bool);
  };

  console.log(clear);
  return (
    <div className="container">
      <Toolbar socket={props.socket} clearCanvas={clearCanvas} />
      <Canvas socket={props.socket} clear={clear} clearCanvas={clearCanvas} />
    </div>
  );
};

export default Container;
