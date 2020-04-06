import React from "react";
import axios from "axios";
import useInput from "../../hooks/useInput.js";
import { store } from "../../store.js";
import ExistingSession from "../ExistingSession/ExistingSession.js";
import "./Landing.css";

const Landing = props => {
  const { state, dispatch } = React.useContext(store);

  const [name, bindName, resetName] = useInput(state.name);
  const [room, bindRoom, resetRoom] = useInput("");
  const [selected, setSelected] = React.useState("newRoom");
  const [existing, setExisting] = React.useState(false);

  const handleChange = e => {
    setSelected(e.target.value);
  };

  const handleSubmit = async e => {
    console.log('landing', props)
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "http://localhost:8000/api/user",
      data: { name, newRoom: selected === "newRoom", room },
      withCredentials: true
    });
    dispatch({ type: "all", payload: res.data });
    resetName();
    resetRoom();
    setSelected("newRoom");

    props.history.push("/draw");
  };

  // get existing session
  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/user",
      withCredentials: true
    }).then(res => {
      if (!res.data.name) return;
      setExisting(true);
      dispatch({ type: "all", payload: res.data });
    });
  }, [dispatch]);

  return (
    <div className="landingPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Name</label>

        <input type="text" {...bindName} />
        {!existing ? (
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
        ) : (
          <ExistingSession user={state} cancel={() => setExisting(false)} />
        )}
        <button className="Btn" type="submit">
          Start drawing!
        </button>
      </form>
    </div>
  );
};

export default Landing;
