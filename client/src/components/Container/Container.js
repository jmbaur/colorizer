import React from "react";
import axios from "axios";
import { socketInst } from "../../socket.js";
import { store } from "../../store.js";
import useMountEffect from "../../hooks/useMountEffect.js";
import Canvas from "../Canvas/Canvas.js";
import Toolbar from "../Toolbar/Toolbar.js";
import "./Container.scss";

const Container = props => {
  const socket = React.useContext(socketInst);
  const { state, dispatch } = React.useContext(store);

  const [clear, setClear] = React.useState(false);
  const [undo, setUndo] = React.useState(false);
  const [download, setDownload] = React.useState(false);
  const [prevLines, setPrevLines] = React.useState([]);
  const [room, setRoom] = React.useState([]);

  //listen for socket messages
  socket.on("room", data => {
    const tmpRoom = room.slice();
    switch (data.type) {
      case "addUser":
        getRoom(data.data.room);
        break;
      case "changedUser":
        let indexC = tmpRoom.findIndex(user => user.id === data.data.id);
        tmpRoom.splice(indexC, 1, data.data);
        setRoom(tmpRoom);
        break;
      case "removeUser":
        const indexR = tmpRoom.findIndex(user => user.id === data.data.id);
        tmpRoom.splice(indexR, 1);
        setRoom(tmpRoom);
        break;
      default:
        throw new Error();
    }
  });

  socket.on("clear", data => {
    console.log("socket clear hit");
    setClear(true);
  });

  socket.on("undo", data => {
    window.alert(`${JSON.stringify(data)}`);

    axios({
      method: "get",
      url: `/api/line?room=${state.room}`
    }).then(res => console.log(res));
  });

  // need functions here that help with drawing, clearing, undoing, etc.
  const getRoom = reqRoom => {
    axios({
      method: "get",
      url: `/api/room?room=${reqRoom}`
    }).then(res => setRoom(res.data));
  };

  const getPrevLines = room => {
    axios({
      method: "get",
      url: `/api/line?room=${room}`
    }).then(res => {
      setPrevLines(res.data);
    });
  };

  const draw = (ctx, x0, y0, x1, y1, color, thickness) => {
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
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
      url: `/api/line`,
      data: {
        id: state.id,
        name: state.name,
        room: state.room,
        line: { color: state.color, thickness: state.thickness, points: line }
      }
    });
  };

  useMountEffect(() => {
    if (state.room) {
      socket.emit("join", state);
      getRoom(state.room);
      getPrevLines(state.room); // get previous lines in the room
      return;
    }

    axios({
      method: "get",
      url: `/api/user`
    }).then(res => {
      dispatch({ type: "all", payload: res.data }); // set global state
      socket.emit("join", res.data); // emit to room of a new user
      getPrevLines(res.data.room); // get previous lines in the room
      getRoom(res.data.room); // finds users in room
    });
  });

  return (
    <section className="container">
      <Toolbar
        setUndo={setUndo}
        setDownload={setDownload}
        setClear={setClear}
        room={room}
      />
      <Canvas
        draw={draw}
        clear={clear}
        setClear={setClear}
        download={download}
        setDownload={setDownload}
        undo={undo}
        saveLine={saveLine}
        prevLines={prevLines}
        setPrevLines={setPrevLines}
      />
    </section>
  );
};

export default Container;
