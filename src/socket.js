import React from "react";
import io from "socket.io-client";
import config from "./constants.js";

const socket = io(`${config.url}/`);

const socketInst = React.createContext(socket);
const { Provider } = socketInst;

const SocketProvider = ({ children }) => {
  return <Provider value={socket}>{children}</Provider>;
};

export { socketInst, SocketProvider };
