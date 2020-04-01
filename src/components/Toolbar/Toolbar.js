import React from "react";
import axios from "axios";
import { store } from "../../store.js";
import "./Toolbar.css";

function Toolbar() {
  const { state, dispatch } = React.useContext(store);
  console.log("GLOBALSTATE", state);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/init",
      withCredentials: true
    }).then(res => {
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
  };

  return (
    <section className="toolbar">

      <div className='sidebar'>
      {/*userSection*/} 
      <div className='userInfo'>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        onBlur={submit}
      />
      <label>Room</label>
      <input
        type="text"
        name="room"
        value={state.room}
        onChange={handleChange}
        onBlur={submit}
      />
      </div>
      <div className='usersWhoJoin'>
      <label>Online</label>
      </div>

      {/*ColorSection*/} 
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
