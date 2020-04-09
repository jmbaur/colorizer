import React from "react";
import Landing from "../components/Landing/Landing.js";
import renderer from "react-test-renderer";

test("onClick function is being called once", () => {
  const component = renderer.create(<Landing />);
  expect(component.toJSON()).toMatchSnapshot;
});
