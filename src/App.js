import React from "react";
import { Switch, Route } from "react-router-dom";
import { SocketProvider } from "./socket.js";
import { StateProvider } from "./store.js";
import Container from "./components/Container/Container.js";
import Landing from "./components/Landing/Landing.js";
import "./reset.css";
import "./App.css";

function App() {
  // const { dispatch } = React.useContext(store);

  // React.useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://localhost:8000/api/getUser",
  //     withCredentials: true
  //   }).then(res => {
  //     dispatch({ type: "all", payload: res.data });
  //     if (res.data.room) {
  //       // JOIN #1
  //       console.log("JOIN #1", res.data);
  //       socket.emit("join", res.data);
  //     }
  //   });
  // }, [dispatch]);

  return (
    <div className="App">
      <SocketProvider>
        <StateProvider>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/draw" component={Container} />
          </Switch>
        </StateProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
