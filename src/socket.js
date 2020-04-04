import React from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:8000/");
console.log("SOOOOOOOCKET", socket);

const socketInst = React.createContext(socket);
const { Provider } = socketInst;

const SocketProvider = ({ children }) => {
  return <Provider value={socket}>{children}</Provider>;
};

export { socketInst, SocketProvider };
