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
  const [prevLines, setPrevLines] = React.useState([]);

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
      data: {
        id: state.id,
        name: state.name,
        room: state.room,
        line: { color: state.color, thickness: state.thickness, points: line }
      },
      withCredentials: true
    });
  };

  const getPrevLines = room => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/lines?room=${room}`,
      withCredentials: true
    }).then(res => {
      // console.log("previous lines", res.data);
      setPrevLines(res.data);
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
      dispatch({ type: "all", payload: res.data }); // set global state
      socket.emit("join", res.data); // emit to room of a new user
      getPrevLines(res.data.room); // get previous lines in the room
    });
  });

  return (
    <div className="container">
      <Toolbar clearCanvas={clearCanvas} handleDownload={handleDownload} />
      <Canvas
        draw={draw}
        clear={clear}
        clearCanvas={clearCanvas}
        download={download}
        handleDownload={handleDownload}
        saveLine={saveLine}
        prevLines={prevLines}
      />
    </div>
  );
};

export default Container;
