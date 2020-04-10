import React from "react";
import axios from "axios";
import useInput from "../../hooks/useInput.js";
import { store } from "../../store.js";
import config from "../../constants.js";
import useMountEffect from "../../hooks/useMountEffect";
import "./Landing.scss";

const Landing = props => {
  const { state, dispatch } = React.useContext(store);

  const [name, bindName, resetName] = useInput(state?.name);
  const [room, bindRoom, resetRoom] = useInput(state?.room);
  const [selected, setSelected] = React.useState("newRoom");

  const handleChange = e => {
    setSelected(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: `${config.url}/api/user`,
      data: { name, newRoom: selected === "newRoom", room },
      withCredentials: true
    });
    dispatch({ type: "all", payload: res.data });
    resetName();
    resetRoom();
    setSelected("newRoom");

    props.history.push("/draw");
  };

  useMountEffect(() => {
    axios({
      method: "get",
      url: `${config.url}/api/user`,
      withCredentials: true
    }).then(res => dispatch({ type: "all", payload: res.data }));
  });

  // reset name in input
  React.useEffect(() => {
    if (!state?.name || !state?.room) return;
    // resetName();
    setSelected("existingRoom");
  }, [state, resetName]);

  return (
    <section className="landingPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label className="username main">Name</label>
        <input className="name" type="text" autoFocus {...bindName} />

        <div className="loginInfo">
          <label className="main">
            New Room
            <input
              type="radio"
              value="newRoom"
              onChange={handleChange}
              checked={selected === "newRoom"}
            />
          </label>

          <label className="main">
            Existing Room
            <input
              type="radio"
              value="existingRoom"
              onChange={handleChange}
              checked={selected === "existingRoom"}
            />
          </label>

          {selected === "existingRoom" ? (
            <div id="roomName">
              <input
                className="name"
                type="text"
                placeholder="Enter room name"
                {...bindRoom}
              />
            </div>
          ) : null}
        </div>
        <button className="Btn" type="submit">
          Start drawing!
        </button>
      </form>
    </section>
  );
};

export default Landing;
