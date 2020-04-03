import React from "react";
import Canvas from "../Canvas/Canvas.js";
import Toolbar from "../Toolbar/Toolbar.js";
// import { store } from "../../store.js";

const Container = props => {
  // const { state } = React.useContext(store);
  const [clear, setClear] = React.useState(false);
  const [download, setDownload] = React.useState(false);

  // need functions here that help with drawing, clearing, undoing, etc.
  const clearCanvas = bool => {
    setClear(bool);
  };

  const handleDownload = bool => {
    setDownload(bool)
  }

  const draw = (ctx, x0, y0, x1, y1, colorParam, thicknessParam) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineCap = "round";
    ctx.strokeStyle = colorParam;
    ctx.lineWidth = thicknessParam;
    ctx.stroke();
    ctx.closePath();
  };

  return (
    <div className="container">
      <Toolbar socket={props.socket} clearCanvas={clearCanvas} handleDownload={handleDownload} />
      <Canvas
        socket={props.socket}
        draw={draw}
        clear={clear}
        clearCanvas={clearCanvas}
        download={download}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default Container;
