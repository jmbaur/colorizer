import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// set axios defaults
(function() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_URL
      : "http://localhost:8000";
  axios.defaults.withCredentials = true;
})();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
