import React from "react";
import axios from "axios";

const initialState = {
  color: "#000000",
  thickness: "3",
  name: "",
  room: ""
};

const store = React.createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "all":
        return { ...state, ...action.payload };
      case "color":
        axios({
          method: "put",
          url: "http://localhost:8000/api/user",
          data: { [action.type]: action.payload },
          withCredentials: true
        });
        return { ...state, color: action.payload };
      case "thickness":
        axios({
          method: "put",
          url: "http://localhost:8000/api/user",
          data: { [action.type]: action.payload },
          withCredentials: true
        });
        return { ...state, thickness: action.payload };
      case "name":
        return { ...state, name: action.payload };
      case "room":
        return { ...state, room: action.payload };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
