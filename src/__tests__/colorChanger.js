import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import Toolbar from "../components/Toolbar/Toolbar.js";

// test("Toggle radio button", () => {
//   const { getByLabelText } = render(<Landing />);
//   const radio = getByLabelText("Existing Room");
//   fireEvent.change(radio, { target: { value: "newRoom" } });
//   expect(radio.value).toBe("newRoom");
// });
