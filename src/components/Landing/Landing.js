import React from "react";
import axios from "axios";
import useInput from "../../hooks/useInput.js";
import { store } from "../../store.js";
import ExistingSession from "../ExistingSession/ExistingSession.js";
import "./Landing.scss";
import color from '../../images/color.svg';

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
    // console.log('landing', props)
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
    <section className="landingPage">
      {/* <img id='logocolor' src={color}/> */}
      <form className="loginForm" onSubmit={handleSubmit}>

        <label className='username main'>Name</label>
        <input className='name' type="text" autofocus {...bindName} />

        {!existing ? (
          <div className="loginInfo">
          
              <label className='main'>New Room</label>
              <input 
                type="radio"
                value="newRoom"
                onChange={handleChange}
                checked={selected === "newRoom"}
              />      
          
             <label className='main'>Existing Room</label>
              <input
                type="radio"
                value="existingRoom"
                onChange={handleChange}
                checked={selected === "existingRoom"}
              />
         
            {selected === "existingRoom" ? (
              <div id='roomName'>
              <input className='name' type="text" placeholder="Enter room name" {...bindRoom} />
              </div>
            ) : null}
          </div>
        ) : (
          <ExistingSession user={state} cancel={() => setExisting(false)} />
        )}
        <button className="Btn" type="submit">
          Start drawing!
        </button>
      </form>
    </section>
  );
};

export default Landing;
