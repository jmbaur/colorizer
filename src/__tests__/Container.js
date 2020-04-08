import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "jest-dom/extend-expect";
import axios from "axios";
import Users, { url } from "./Users";

test("show loader when it's fetching data, then render users' name on rows", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      results: [
        {
          name: {
            first: "ali"
          }
        },
        {
          name: {
            first: "abu"
          }
        }
      ]
    }
  });

  //show loader
  const { getAllByTestId, getByText } = render(<Users />);
  expect(getByText(/loading.../i)).toBeInTheDocument();

  //check what's rendered in the row
  const rowValues = await waitForElement(() =>
    getAllByTestId("row").map(row => row.textContent)
  );
  expect(rowValues).toEqual(["ali", "abu"]);
  expect(axios.get).toHaveBeenCalledWith(url);
  expect(axios.get).toHaveBeenCalledTimes(1);
});
