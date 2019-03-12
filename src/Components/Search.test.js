import React from "react";
import Search from "./Search.js";
import {
  render,
  fireEvent,
  getByTestId,
  getByText
} from "react-testing-library";

// test the radio button click
test("repo details radio button toggle", () => {
  const state = {
    username: "",
    searchType: "userdetails",
    formError: false
  };
  const { getByText, container } = render(<Search {...state} />);
  const buttonNode = getByText("Submit");
  fireEvent.click(buttonNode);
  expect(container.querySelector("form").lastChild.textContent).toEqual(
    "Please enter a valid username"
  );
});

// json representation of dom nodes in react test renderer
// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
