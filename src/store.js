import React from "react";
import axios from "axios";

let initialState = {
  color: "#000000",
  thickness: "3",
  name: "Anonymous",
  room: ""
};

const store = React.createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((_state, action) => {
    switch (action.type) {
      case "color":
        axios({
          method: "put",
          url: "http://localhost:8000/api/user",
          data: { [action.type]: action.payload },
          withCredentials: true
        });
        initialState.color = action.payload;
        return { ...initialState, color: action.payload };
      case "thickness":
        axios({
          method: "put",
          url: "http://localhost:8000/api/user",
          data: { [action.type]: action.payload },
          withCredentials: true
        });
        initialState.thickness = action.payload;
        return { ...initialState, thickness: action.payload };
      case "name":
        initialState.name = action.payload;
        return { ...initialState, name: action.payload };
      case "room":
        initialState.room = action.payload;
        return { ...initialState, room: action.payload };
      case "all":
        initialState = action.payload;
        return { ...initialState, ...action.payload };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
