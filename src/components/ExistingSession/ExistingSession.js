import React from "react";
import { withRouter } from "react-router-dom";
import './ExistingSession.scss'

const ExistingSession = props => {
  const rejoin = () => {
    props.history.push("/draw");
  };

  return (
    <div className='ExistingSession'>
      <h1>Rejoin room "{props.user.room}"?</h1>
      <button className='Btn' onClick={rejoin}>Yes</button>
      &nbsp;
      <button className='Btn' onClick={props.cancel}>No</button>
    </div>
  );
};

export default withRouter(ExistingSession);
