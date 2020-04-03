import React from "react";
import Canvas from "../Canvas/Canvas.js";
import Toolbar from "../Toolbar/Toolbar.js";
// import { store } from "../../store.js";

const Container = props => {
  // need functions here that help with drawing, clearing, undoing, etc.

  // const { state } = React.useContext(store);
  // props.socket.on("room", data => console.log(data));

  // React.useEffect(() => {
  //   console.log("hitttt");
  //   props.socket.emit("room", state);
  // });

  return (
    <div className='container'>
      <Toolbar socket={props.socket} />
      <Canvas socket={props.socket} />
    </div>
  );
};

export default Container;
