const initialState = {
  color: "#000000",
  thickness: 1,
  name: "anonymous user",
  room: ""
};

const SET_COLOR = "SET_COLOR";
const SET_THICKNESS = "SET_THICKNESS";
const SET_NAME = "SET_NAME";
const SET_ROOM = "SET_ROOM";

// export function setSetting({ type, payload }) {
//   return {
//     type,
//     payload
//   };
// }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, color: action.payload };
    case SET_THICKNESS:
      return { ...state, thickness: action.payload };
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_ROOM:
      return { ...state, room: action.payload };
    default:
      return state;
  }
}
