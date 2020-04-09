import React from "react";
import { withRouter } from "react-router-dom";
import './ExistingSession.scss'

const ExistingSession = props => {
  const rejoin = () => {
    props.history.push("/draw");
  };

  return (
    <div className='ExistingSession'>
      <h1 id='rejoin'>Rejoin room <span>"</span>{props.user.room}<span>"</span>?</h1>
      <button className='Btn green' onClick={rejoin}>Yes</button>
      &nbsp;
      <button className='Btn red' onClick={props.cancel}>No</button>
    </div>
  );
};

export default withRouter(ExistingSession);
