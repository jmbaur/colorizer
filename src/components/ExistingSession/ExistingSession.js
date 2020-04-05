import React from "react";
import { withRouter } from "react-router-dom";

const ExistingSession = props => {
  const rejoin = () => {
    props.history.push("/draw");
  };

  return (
    <div>
      <h1>Rejoin room "{props.user.room}"?</h1>
      <button onClick={rejoin}>Yes</button>
      <button onClick={props.cancel}>No</button>
    </div>
  );
};

export default withRouter(ExistingSession);
