const initialState = {
  color: "#000"
};

const GET_COLOR = "GET_COLOR";
const SET_COLOR = "SET_COLOR";

export function getColor() {
  return {
    type: GET_COLOR,
    payload: initialState.color
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COLOR:
      return state;
    case SET_COLOR:
      return { ...state, color: action.payload };
    default:
      return state;
  }
}
