import React from "react";
import { store } from "../../store.js";
import { socketInst } from "../../socket.js";

const Canvas = props => {
  const { state } = React.useContext(store);
  const socket = React.useContext(socketInst);

  socket.on("draw", data => {
    setData(data);
  });

  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [line, setLine] = React.useState([]);

  const getCanvas = () => {
    return {
      ctx: canvasRef.current.getContext("2d"),
      canvas: canvasRef.current
    };
  };

  const reset = () => {
    if (!drawing) return;

    // const storage = JSON.parse(localStorage.getItem("drawing"));
    // if (storage) {
    //   localStorage.setItem(
    //     "drawing",
    //     JSON.stringify({
    //       lines: [...storage.lines, line],
    //       width: window.innerWidth,
    //       height: window.innerHeight
    //     })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "drawing",
    //     JSON.stringify({
    //       lines: [line],
    //       width: window.innerWidth,
    //       height: window.innerHeight
    //     })
    //   );
    // }

    setPos(null);
    props.saveLine(line);
    setLine([]);
    setDrawing(false);
  };

  const startDrawing = e => {
    setPos({
      x: e.clientX * window.innerWidth,
      y: e.clientY * window.innerHeight
    });
    setDrawing(true);
  };

  const moveMouse = e => {
    if (!drawing) return;
    const { ctx } = getCanvas();
    // needed if there is a misalignment
    // const rect = canvas.getBoundingClientRect();
    setPos({
      x: e.clientX * window.innerWidth,
      y: e.clientY * window.innerHeight
    });
    setLine(line => [...line, pos]);
    socket.emit("draw", {
      room: state.room,
      data: {
        x0: pos.x,
        y0: pos.y,
        x1: e.clientX * window.innerWidth,
        y1: e.clientY * window.innerHeight,
        color: state.color,
        thickness: state.thickness
      }
    });
    props.draw(
      ctx,
      pos.x / window.innerWidth,
      pos.y / window.innerHeight,
      e.clientX,
      e.clientY,
      state.color,
      state.thickness
    );
  };

  // draw lines from other users
  React.useEffect(() => {
    if (!data) return;
    const { ctx } = getCanvas();
    props.draw(
      ctx,
      data.x0 / window.innerWidth,
      data.y0 / window.innerHeight,
      data.x1 / window.innerWidth,
      data.y1 / window.innerHeight,
      data.color,
      data.thickness
    );
  }, [props, data]);

  // clear the canvas
  React.useEffect(() => {
    if (!props.clear) return;
    const { ctx, canvas } = getCanvas();
    ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
    // localStorage.clear();
    props.clearCanvas(false);
  }, [props]);

  // download the canvas to png
  React.useEffect(() => {
    if (!props.download) return;
    const { canvas } = getCanvas();
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "art.png";
    a.click();
    props.handleDownload(false);
  }, [props]);

  // draw previous lines in room
  React.useEffect(() => {
    if (!props.prevLines.length) return;
    const { ctx } = getCanvas();
    for (let i = 0; i < props.prevLines.length; i++) {
      for (let j = 0; j < props.prevLines[i].points.length - 1; j++) {
        let { x: x0, y: y0 } = props.prevLines[i].points[j];
        let { x: x1, y: y1 } = props.prevLines[i].points[j + 1];
        let { color, thickness } = props.prevLines[i];
        props.draw(
          ctx,
          // x0,
          // y0,
          // x1,
          // y1,
          x0 / window.innerWidth,
          y0 / window.innerHeight,
          x1 / window.innerWidth,
          y1 / window.innerHeight,
          color,
          thickness
        );
      }
    }
  }, [props]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={startDrawing}
      onMouseUp={reset}
      onMouseOut={reset}
      onMouseMove={moveMouse}
    />
  );
};

export default Canvas;
