const initialState = {
  color: "#000",
  thickness: "1px"
};

const SET_COLOR = "SET_COLOR";
const SET_THICKNESS = "SET_THICKNESS";

export function getSettings() {}

export function setColor(color) {
  return {
    type: SET_COLOR,
    payload: color
  };
}

export function setThickness(thickness) {
  return {
    type: SET_THICKNESS,
    payload: thickness
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, color: action.payload };
    case SET_THICKNESS:
      return { ...state, thickness: action.payload };
    default:
      return state;
  }
}
