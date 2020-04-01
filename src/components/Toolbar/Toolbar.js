import React from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { store } from "../../store.js";
import "./Toolbar.css";

const socket = socketIOClient("http://localhost:8000/");

function Toolbar() {
  const { state, dispatch } = React.useContext(store);
  console.log("GLOBALSTATE", state);

  React.useEffect(() => {
    console.log("hit");
    axios({
      method: "get",
      url: "http://localhost:8000/api/init",
      withCredentials: true
    }).then(res => {
      socket.emit("join", res.data);
      dispatch({ type: "all", payload: res.data });
    });
  }, [dispatch]);

  const handleChange = e =>
    dispatch({ type: e.target.name, payload: e.target.value });

  const submit = e => {
    axios({
      method: "put",
      url: "http://localhost:8000/api/user",
      data: { [e.target.name]: e.target.value },
      withCredentials: true
    });
    socket.emit("join", state);
  };

  return (
    <section className="toolbar">
      <div className='info'>
      <label>Name</label>
      <br/>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        onBlur={submit}
      />
      <br/>
      <label>Room</label>
      <br/>
      <input
        type="text"
        name="room"
        value={state.room}
        onChange={handleChange}
        onBlur={submit}
      />
      </div>
      <div className="picker">
        <h2>Pick a Color!</h2>
        <input
          type="color"
          name="color"
          value={state.color}
          onChange={handleChange}
        />
      </div>
      <div className="sliderCont">
        <input
          className="slider"
          name="thickness"
          value={state.thickness}
          onChange={handleChange}
          type="range"
          min="1"
          max="10"
        />
      </div>

      <div className="buttons">
        <button className="Btn">Undo</button>
        <br />
        <br />
        <button className="Btn">Clear</button>
      </div>
    </section>
  );
}

export default Toolbar;
