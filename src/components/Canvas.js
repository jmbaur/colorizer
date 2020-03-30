import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:8000");

const Canvas = () => {
  socket.on("draw", data => setData(data));

  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [line, setLine] = React.useState([]);

  const draw = (ctx, x0, y0, x1, y1) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  };

  const reset = () => {
    if (!drawing) return;

    const storage = JSON.parse(localStorage.getItem("drawing"));
    // console.log(storage?.lines);
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

  React.useEffect(() => {
    if (!data) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(data);
    draw(
      ctx,
      data.x0 * window.innerWidth,
      data.y0 * window.innerHeight,
      data.x1 * window.innerWidth,
      data.y1 * window.innerHeight
    );
  }, [data]);

  return (
    <div>
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
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          setPos({ x: e.clientX, y: e.clientY });
          setLine(line => [...line, pos]);
          socket.emit("draw", {
            x0: pos.x / window.innerWidth,
            y0: pos.y / window.innerHeight,
            x1: e.clientX / window.innerWidth,
            y1: e.clientY / window.innerHeight
          });
          draw(ctx, pos.x, pos.y, e.clientX, e.clientY);
        }}
      />
    </div>
  );
};

export default Canvas;
