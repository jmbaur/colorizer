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

  const load = () => {
    const lines = JSON.parse(localStorage.getItem("drawing")).lines;
    console.log(lines)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < lines.length - 1; i++) {
      for (let j = 0; j < lines.length - 2; j++) {
        // draw(
        //   ctx,
        //   lines[i][j].x,
        //   lines[i][j].y,
        //   lines[i][j + 1].x,
        //   lines[i][j + 1].y
        // );
      }
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.clear();
  };

  React.useEffect(() => {
    if (!data) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // console.log(data);
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
      <button onClick={load}>Load</button>
      <button onClick={clear}>Clear</button>
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
