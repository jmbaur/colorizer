import React from "react";
import Landing from "../components/Landing/Landing.js";
import renderer from "react-test-renderer";

test("onClick function is being called once", () => {
  const component = renderer.create(<Landing />);
  expect(component.toJSON()).toMatchSnapshot;
});

test('renders with "" as initial state of the name input field', () => {
  const component = renderer.create(<Landing />);
  const instance = component.getInstance();

  console.log("INSTANCE", instance);
});
