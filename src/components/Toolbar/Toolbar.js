import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { socketInst } from "../../socket.js";
import { store } from "../../store.js";
import useInput from "../../hooks/useInput.js";
import Room from "../Room/Room.js";
import "./Toolbar.scss";

const Toolbar = props => {
  const socket = React.useContext(socketInst);
  const { state, dispatch } = React.useContext(store);

  const [name, bindName] = useInput(state?.name);
  const [changeName, setChangeName] = React.useState(false);

  const handleChange = e => {
    dispatch({ type: e.target.name, payload: e.target.value });
    socket.emit("change", { ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    axios({
      method: "put",
      url: "http://localhost:8000/api/user",
      data: { name },
      withCredentials: true
    });
    dispatch({ type: "name", payload: e.target.value });
    socket.emit("change", state);
    setChangeName(false);
  };

  return (
    <section className="toolbar">
      <div className="userInfo">
        <label className="labels">Username:</label>
        {!changeName ? (
          <p onClick={() => setChangeName(true)}>{state?.name}</p>
        ) : (
          <div className="editName">
            <input
              type="text"
              name="name"
              placeholder="Change your name"
              {...bindName}
              onBlur={handleSubmit}
              autoFocus
            />
          </div>
        )}

        <label className="labels">Room</label>
        <p>{state?.room}</p>
      </div>
      <button
        className="Btn right"
        onClick={() => {
          socket.emit("leave", state);
          axios({
            method: "delete",
            url: "http://localhost:8000/api/user",
            data: { user: state },
            withCredentials: true
          });
          props.history.push("/");
        }}
      >
        Leave Room
      </button>

      <div className="usersWhoJoin">
        <label className="labels">Online</label>
        <Room room={props.room} />
      </div>

      <div className="colorContainer">
        <label className="labels">Pick a Color!</label>
        <input
          className="colorPicker"
          type="color"
          name="color"
          value={state?.color}
          onChange={handleChange}
        />
      </div>

      {/*SliderSection*/}
      <div className="sliderContainer">
        <input
          className="slider"
          name="thickness"
          value={state?.thickness}
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
        <button className="Btn clear" onClick={() => props.clearCanvas(true)}>
          Clear
        </button>
        <br />
        <div className="download">
          <button
            className="Btn left"
            onClick={() => props.handleDownload(true)}
          >
            Download Art
          </button>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Toolbar);
