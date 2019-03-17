import React from "react";
import Login from "../Login.js";
import {
  render,
  fireEvent,
  getByTestId,
  getAllByLabelText,
  getByPlaceholderText
} from "react-testing-library";

describe("Login component", () => {
  // login button click
  test("login button click with no username or password = failure message", () => {
    const state = {
      username: "",
      password: "",
      formError: false
    };
    const { getByText, container } = render(<Login {...state} />);
    const buttonNode = getByText("Login");
    fireEvent.click(buttonNode);
    expect(container.querySelector("form").lastChild.textContent).toEqual(
      "Your username or password was incorrect. Please try again."
    );
  });
});
