import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SocketProvider } from "./socket.js";
import { StateProvider } from "./store.js";
import Container from "./components/Container/Container.js";
import Landing from "./components/Landing/Landing.js";
import "./style/reset.scss";
import "./style/App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketProvider>
          <StateProvider>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/draw" component={Container} />
            </Switch>
          </StateProvider>
        </SocketProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
