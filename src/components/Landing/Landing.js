import React from "react";
import axios from "axios";
import useInput from "../../hooks/useInput.js";
import { store } from "../../store.js";

const Landing = () => {
  const { dispatch } = React.useContext(store);

  const [name, bindName, resetName] = useInput("");
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
    }).then(res => dispatch({ type: "all", payload: res.data }));
    resetName();
    resetRoom();
    setSelected("newRoom");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" {...bindName} />
        <label>New Room</label>
        <input
          type="radio"
          value="newRoom"
          onChange={handleChange}
          checked={selected === "newRoom"}
        />
        <label>Existing Room</label>
        <input
          type="radio"
          value="existingRoom"
          onChange={handleChange}
          checked={selected === "existingRoom"}
        />
        {selected === "existingRoom" ? (
          <>
            <label>Room</label>
            <input type="text" {...bindRoom} />
          </>
        ) : null}
        <button type="submit">Start drawing!</button>
      </form>
    </div>
  );
};

export default Landing;
