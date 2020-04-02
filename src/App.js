import React from "react";
import Container from "./components/Container/Container.js";
import Landing from "./components/Landing/Landing.js";
import { store } from "./store.js";
import "./App.css";

function App() {
  const { state } = React.useContext(store);
  return (
    <div className="App">
      {!state.room || !state.name ? <Landing /> : <Container />}
    </div>
  );
}

export default App;
