import React from "react";
import io from "socket.io-client";

const socket =
  process.env.NODE_ENV === "production"
    ? io(`${process.env.REACT_APP_URL}/`)
    : io("http://api:8001/");

const socketInst = React.createContext(socket);
const { Provider } = socketInst;

const SocketProvider = ({ children }) => {
  return <Provider value={socket}>{children}</Provider>;
};

export { socketInst, SocketProvider };
