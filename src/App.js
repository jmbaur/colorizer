import React from "react";
import Container from "./components/Container/Container.js";
import Landing from "./components/Landing/Landing.js";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { store } from "./store.js";
import "./App.css";

const socket = socketIOClient("http://localhost:8000/");

function App() {
  const { state, dispatch } = React.useContext(store);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/getUser",
      withCredentials: true
    }).then(res => dispatch({ type: "all", payload: res.data }));
  }, [dispatch]);

  return (
    <div className="App">
      {!state.room ? (
        <Landing socket={socket} />
      ) : (
        <Container socket={socket} />
      )}
    </div>
  );
}

export default App;
