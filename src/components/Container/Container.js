import React from "react";
import axios from "axios";
import { socketInst } from "../../socket.js";
import { store } from "../../store.js";
import useMountEffect from "../../hooks/useMountEffect.js";
import Canvas from "../Canvas/Canvas.js";
import Toolbar from "../Toolbar/Toolbar.js";

const Container = props => {
  const socket = React.useContext(socketInst);
  const { state, dispatch } = React.useContext(store);

  const [clear, setClear] = React.useState(false);
  const [download, setDownload] = React.useState(false);

  // need functions here that help with drawing, clearing, undoing, etc.
  const clearCanvas = bool => {
    setClear(bool);
  };

  const handleDownload = bool => {
    setDownload(bool);
  };

  const draw = (ctx, x0, y0, x1, y1, colorParam, thicknessParam) => {
    ctx.lineCap = "round";
    ctx.strokeStyle = colorParam;
    ctx.lineWidth = thicknessParam;
    // draw line
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.stroke();
  };

  const saveLine = line => {
    axios({
      method: "post",
      url: "http://localhost:8000/api/line",
      data: { id: state.id, name: state.name, room: state.room, line },
      withCredentials: true
    });
  };

  useMountEffect(() => {
    if (state.room) {
      socket.emit("join", state);
      return;
    }
    axios({
      method: "get",
      url: "http://localhost:8000/api/user",
      withCredentials: true
    }).then(res => {
      dispatch({ type: "all", payload: res.data });
      socket.emit("join", res.data);
    });
  });

  // Protected
  // useMountEffect(() => {
  //   if (!state.room) props.history.push("/");
  // });

  return (
    <div className="container">
      <Toolbar clearCanvas={clearCanvas} handleDownload={handleDownload} />
      <Canvas
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
