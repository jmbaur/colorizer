// import React from 'react';
// import {render} from '@testing-library/react'
// import Toolbar from '../components/Toolbar/Toolbar';
// import {BrowserRouter, withRouter} from 'react-router-dom';


// it("it renders outstarting text",  () => {
//     const room = [{id:'1234', thickness:'3', color:'red', name:'hello'}]

//     const {container} = render(<BrowserRouter><Toolbar room={room}/></BrowserRouter>);

//     expect(container.textContent).toContain('Username:')
    // expect(editnameCheck).not.toBeTruthy();
// });


import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom"
import { render } from "@testing-library/react";
import Toolbar from "../components/Toolbar/Toolbar";

it("renders starting text", () => {
    const room = [
        { id: "1234", thickness: "4", color: "#ff0000", name: "John Appleseed" }
      ];

    const {container} = render(<BrowserRouter><Toolbar room={room}/></BrowserRouter>)

    expect(container.textContent).toContain("Username")
})