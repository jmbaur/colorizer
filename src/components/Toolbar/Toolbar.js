import React from "react";
import axios from "axios";
import { store } from "../../store.js";
import useInput from "../../hooks/useInput.js";
import Room from "../Room/Room.js";
import "./Toolbar.css";

const Toolbar = props => {
  props.socket.on("room", data => {
    setRoom(data.users);
    localStorage.setItem("room", JSON.stringify(data.users));
  });

  const { state, dispatch } = React.useContext(store);
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
    props.socket.emit("change", state);
    setChangeName(false);
  };

  React.useEffect(() => {
    props.socket.emit("change", state);
  }, [state, props.socket]);

  React.useEffect(() => {
    const currRoom = localStorage.getItem("room");
    console.log(currRoom);
  }, [room]);

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
          />
        )}
        <br />
        <label>Room</label>
        <p>{state.room}</p>

        <button
          className="Btn"
          onClick={() => {
            props.socket.emit("leave", state);
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
        <button className="Btn" onClick={() => props.clearCanvas(true)}>
          Clear
        </button>
      </div>

    </section>
  );
};

export default Toolbar;
