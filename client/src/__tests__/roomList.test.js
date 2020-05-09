import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Room from "../components/Room/Room.js";

test("Room list renders correct info", () => {
  const room = [
    { id: "1234", thickness: "4", color: "#ff0000", name: "John Appleseed" }
  ];

  const { getByTestId } = render(<Room room={room} />);
  const roomList = getByTestId("room-list");
  expect(roomList).toHaveTextContent("John Appleseed");
});
