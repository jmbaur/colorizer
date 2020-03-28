import React from "react";
import socketIOClient from "socket.io-client";

const Canvas = () => {
  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const [prevPos, setPrevPos] = React.useState(null);
  const [line, setLine] = React.useState([]);

  const socket = socketIOClient("http://localhost:8000");
  const sendToServer = data => socket.emit("line", data);

  const draw = ctx => {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(prevPos.x, prevPos.y);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  };

  const reset = () => {
    if (drawing) {
      sendToServer(line);
      setLine([]);
      setDrawing(false);
    }
  };

  React.useEffect(() => {
    if (pos) setLine(l => [...l, pos]);
  }, [drawing, pos]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => {
        setPrevPos({ x: e.clientX, y: e.clientY });
        setPos({ x: e.clientX, y: e.clientY });
        setDrawing(true);
      }}
      onMouseUp={reset}
      onMouseOut={reset}
      onMouseMove={e => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        setPrevPos(pos);
        setPos({ x: e.clientX, y: e.clientY });
        draw(ctx);
      }}
    />
  );
};

export default Canvas;
