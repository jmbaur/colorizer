import React from "react";
import axios from "axios";
import { socketInst } from "../../socket.js";
import { store } from "../../store.js";
import useInput from "../../hooks/useInput.js";
import Room from "../Room/Room.js";
import "./Toolbar.css";

const Toolbar = props => {
  const socket = React.useContext(socketInst);
  console.log("SOCKET", socket);
  const { state, dispatch } = React.useContext(store);

  socket.on("room", data => {
    const index = room.findIndex(el => el.id === data.id);
    setRoom(data.users);
  });

  const [name, bindName] = useInput(state.name);
  const [changeName, setChangeName] = React.useState(false);
  const [room, setRoom] = React.useState([]);

  const handleChange = e => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const handleSubmit = e => {
    axios({
      method: "put",
      url: "http://localhost:8000/api/setUser",
      data: { name },
      withCredentials: true
    });
    dispatch({ type: "name", payload: e.target.value });
    socket.emit("change", state);
    setChangeName(false);
  };

  React.useEffect(() => {
    socket.emit("change", state);
  }, [state, socket]);

  return (
    <section className="toolbar">
      <div className="userInfo">
        <label>Username:</label>
        {!changeName ? (
          <p onClick={() => setChangeName(true)}>{state.name}</p>
        ) : (
          <input
            type="text"
            name="name"
            placeholder="Change your name"
            {...bindName}
            onBlur={handleSubmit}
            autoFocus
          />
        )}
        <br />
        <label>Room</label>
        <p>{state.room}</p>
        <br />
        <button
          className="Btn"
          onClick={() => {
            socket.emit("leave", state);
            dispatch({ type: "room", payload: "" });
          }}
        >
          Leave Room
        </button>
      </div>

      <div className="usersWhoJoin">
        <label>Online</label>

        <Room room={room} />
      </div>

      <div className="pickerInput">
        <p>Pick a Color!</p>
        <br />
        <input
          type="color"
          name="color"
          value={state.color}
          onChange={handleChange}
        />
      </div>

      {/*SliderSection*/}
      <div className="sliderContainer">
        <input
          className="sliderInput"
          name="thickness"
          value={state.thickness}
          onChange={handleChange}
          type="range"
          min="1"
          max="10"
        />
      </div>

      {/*ButtonsSection*/}
      <div className="buttons">
        <button className="Btn">Undo</button>
        &nbsp;
        <button className="Btn" onClick={() => props.clearCanvas(true)}>
          Clear
        </button>
        <br />
        <div className="export">
          <button className="Btn" onClick={() => props.handleDownload(true)}>
            Export Art
          </button>
        </div>
      </div>
    </section>
  );
};

export default Toolbar;
