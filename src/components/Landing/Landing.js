import React from "react";
import axios from "axios";
import useInput from "../../hooks/useInput.js";
import { store } from "../../store.js";
import "./Landing.css";

const Landing = props => {
  const { state, dispatch } = React.useContext(store);

  const [name, bindName, resetName] = useInput(state.name || "");
  const [room, bindRoom, resetRoom] = useInput("");
  const [selected, setSelected] = React.useState("newRoom");

  const handleChange = e => {
    setSelected(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/api/init",
      data: { name, newRoom: selected === "newRoom", room },
      withCredentials: true
    }).then(res => {
      props.socket.emit("join", res.data);
      dispatch({ type: "all", payload: res.data });
    });
    resetName();
    resetRoom();
    setSelected("newRoom");
  };

  return (
    <div className="landingPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Name</label>

        <input type="text" {...bindName} />
        <div className="loginInnerC">
          <div>
            <label>New Room</label>
            <input
              type="radio"
              value="newRoom"
              onChange={handleChange}
              checked={selected === "newRoom"}
            />
          </div>
          <div>
            <label>Existing Room</label>
            <input
              type="radio"
              value="existingRoom"
              onChange={handleChange}
              checked={selected === "existingRoom"}
            />
          </div>
          {selected === "existingRoom" ? (
            <input type="text" placeholder="Enter room name" {...bindRoom} />
          ) : null}
        </div>
        <button className="Btn" type="submit">
          Start drawing!
        </button>
      </form>
    </div>
  );
};

export default Landing;
