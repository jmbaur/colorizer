import React from "react";
import { store } from "../../store.js";

const Canvas = props => {
  props.socket.on("draw", data => {
    setData(data);
  });

  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [line, setLine] = React.useState([]);
  const { state } = React.useContext(store);

  const getCanvas = () => {
    return {
      ctx: canvasRef.current.getContext("2d"),
      canvas: canvasRef.current
    };
  };

  const reset = () => {
    if (!drawing) return;

    const storage = JSON.parse(localStorage.getItem("drawing"));
    if (storage) {
      localStorage.setItem(
        "drawing",
        JSON.stringify({
          lines: [...storage.lines, line],
          width: window.innerWidth,
          height: window.innerHeight
        })
      );
    } else {
      localStorage.setItem(
        "drawing",
        JSON.stringify({
          lines: [line],
          width: window.innerWidth,
          height: window.innerHeight
        })
      );
    }

    setPos(null);
    setLine([]);
    setDrawing(false);
  };

  // draw lines from other users
  React.useEffect(() => {
    if (!data) return;
    const { ctx } = getCanvas();
    props.draw(
      ctx,
      data.x0 * window.innerWidth,
      data.y0 * window.innerHeight,
      data.x1 * window.innerWidth,
      data.y1 * window.innerHeight,
      data.color,
      data.thickness
    );
  }, [props, data]);

  // clear the canvas
  React.useEffect(() => {
    if (!props.clear) return;
    const { ctx, canvas } = getCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.clear();
    props.clearCanvas(false);
  }, [props]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => {
        setPos({ x: e.clientX, y: e.clientY });
        setDrawing(true);
      }}
      onMouseUp={reset}
      onMouseOut={reset}
      onMouseMove={e => {
        if (!drawing) return;
        const { ctx } = getCanvas();
        // needed if there is a misalignment
        // const rect = canvas.getBoundingClientRect();
        setPos({ x: e.clientX, y: e.clientY });
        setLine(line => [...line, pos]);
        props.socket.emit("draw", {
          room: state.room,
          data: {
            x0: pos.x / window.innerWidth,
            y0: pos.y / window.innerHeight,
            x1: e.clientX / window.innerWidth,
            y1: e.clientY / window.innerHeight,
            color: state.color,
            thickness: state.thickness
          }
        });
        props.draw(
          ctx,
          pos.x,
          pos.y,
          e.clientX,
          e.clientY,
          state.color,
          state.thickness
        );
      }}
    />
  );
};

export default Canvas;
