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
      <button className='Btn left' onClick={rejoin}>Yes</button>
      &nbsp;
      <button className='Btn right' onClick={props.cancel}>No</button>
    </div>
  );
};

export default withRouter(ExistingSession);
