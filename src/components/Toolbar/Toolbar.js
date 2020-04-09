import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { socketInst } from "../../socket.js";
import { store } from "../../store.js";
import useInput from "../../hooks/useInput.js";
import Room from "../Room/Room.js";
import config from "../../constants.js";
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
      url: `${config.url}/api/user`,
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
              data-testid="editName!"
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
        className="Btn red"
        onClick={() => {
          socket.emit("leave", state);
          axios({
            method: "delete",
            url: `${config.url}/api/user`,
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
          data-testid="colorPicker!"
          className="colorPicker"
          type="color"
          name="color"
          value={state?.color}
          onChange={handleChange}
        />
     

      {/*SliderSection*/}
      <div className="sliderContainer">
        <input
          data-testid="slider!"
          className="slider"
          name="thickness"
          value={state?.thickness}
          onChange={handleChange}
          type="range"
          min="1"
          max="10"
        />
      </div>
      </div>

      {/*ButtonsSection*/}
      <div className="buttons">
        {/* <button */}
        {/*   className="Btn" */}
        {/*   onClick={() => { */}
        {/*     socket.emit("undo", state); */}
        {/*     props.setUndo(true); */}
        {/*   }} */}
        {/* > */}
        {/*   Undo */}
        {/* </button> */}
        &nbsp;
        <button
          className="Btn clear"
          onClick={() => {
            socket.emit("clear", state);
            props.setClear(true);
          }}
        >
          Clear
        </button>
        <br />
        <div className="download">
          <button className="Btn green" onClick={() => props.setDownload(true)}>
            Download Art
          </button>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Toolbar);
