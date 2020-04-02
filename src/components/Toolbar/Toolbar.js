import React from "react";
import axios from "axios";
import { store } from "../../store.js";
import "./Toolbar.css";

function Toolbar(props) {
  props.socket.on("room", data => console.log(data));
  props.socket.on("roomUsers", data => console.log(data));

  const { state, dispatch } = React.useContext(store);
  console.log("GLOBALSTATE", state);

  React.useEffect(() => {
    console.log("hit");
    axios({
      method: "get",
      url: "http://localhost:8000/api/init",
      withCredentials: true
    }).then(res => {
      props.socket.emit("join", res.data);
      dispatch({ type: "all", payload: res.data });
    });
  }, [dispatch, props.socket]);

  const handleChange = e =>
    dispatch({ type: e.target.name, payload: e.target.value });

  const submit = e => {
    axios({
      method: "put",
      url: "http://localhost:8000/api/user",
      data: { [e.target.name]: e.target.value },
      withCredentials: true
    });
    props.socket.emit("join", state);
  };

  return (
    <section className="toolbar">
      <div className='sidebar'>

      <div className='userInfo'>

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={state.name}
        placeholder="Change your name"
        onChange={handleChange}
        onBlur={submit}
      />
      <label>Room</label>
      <p>{state.room}</p>
      {/* <input
        type="text"
        name="room"
        value={state.room}
        onChange={handleChange}
        onBlur={submit}
      /> */}

      </div>
      <div className='usersWhoJoin'>
      <label>Online</label>
      </div>


      <div className="pickerInput">
        <h2>Pick a Color!</h2>
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
        <button className="Btn">Clear</button>
      </div>
    </div>
    </section>
  );
}

export default Toolbar;
