import React from "react";

const Popup = props => {
  return (
    <div>
      <h1>{props.message}</h1>
      <button onClick={props.yes}>Yes</button>
      <button onClick={props.no}>No</button>
    </div>
  );
};

export default Popup;
