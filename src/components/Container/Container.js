import React from "react";
// import axios from "axios";
// import { store } from "../../store.js";
import Canvas from "../Canvas/Canvas.js";
import Toolbar from "../Toolbar/Toolbar.js";

const Container = props => {
  // const { dispatch } = React.useContext(store);
  // need functions here that help with drawing, clearing, undoing, etc.
  return (
    <div className='container'>
      <Toolbar socket={props.socket} />
      <Canvas socket={props.socket} />
    </div>
  );
};

export default Container;
