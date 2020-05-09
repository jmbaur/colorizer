import React from "react";
import "./Room.scss";

const Room = props => {
  const mappedUsers = props.room.map(user => {
    return (
      <div className="room" key={user.id}>
        <div
          className="stroke"
          style={{
            height: `${user.thickness * 2}px`,
            width: `${user.thickness * 2}px`,
            borderRadius: "50%",
            border: "1px solid white",
            backgroundColor: user.color
          }}
        ></div>
        &nbsp;
        <div className="userName">{user.name}</div>
      </div>
    );
  });
  return <div data-testid="room-list">{mappedUsers}</div>;
};

export default Room;
