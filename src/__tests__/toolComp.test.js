import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom"
import { render } from "@testing-library/react";
import Toolbar from "../components/Toolbar/Toolbar";

//Checks for Username info
it("renders starting text for username", () => {
    const room = [{id:'1', thickness:'3', color:'blue', name:'hello'}]
    const {container} = render(<BrowserRouter><Toolbar room={room}/></BrowserRouter>)

    expect(container.textContent).toContain("Username")
});

//Checks for editNames does not render
it('Checks slider container renders', () => {
    const room = [{id:'1', thickness:'3', color:'blue', name:'hello'}]
    const {queryByTestId} = render(<BrowserRouter><Toolbar room={room}/></BrowserRouter>);
    const picker = queryByTestId('editName');

    expect(picker).not.toBeTruthy()
});

//Checks for colorPicker
it('renders color picker!', () => {
    const room = [{id:'1', thickness:'3', color:'blue', name:'hello'}]
    const {queryByTestId} = render(<BrowserRouter><Toolbar room={room}/></BrowserRouter>);
    const picker = queryByTestId('colorPicker!');

    expect(picker).toBeTruthy()
});




