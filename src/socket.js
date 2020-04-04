import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000/");

const socketInst = React.createContext(socket);
const { Provider } = socketInst;

const SocketProvider = ({ children }) => {
  return <Provider value={socket}>{children}</Provider>;
};

export { socketInst, SocketProvider };
