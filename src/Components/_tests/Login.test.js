import React from "react";
import Login from "../Login.js";
import { render, fireEvent, cleanup } from "react-testing-library";

describe("Login component", () => {
  // unmount and cleanup DOM after each test is finished
  afterEach(cleanup);

  // 1.
  // last child of login component is a div
  test("last child of login component is a div with text", () => {
    const { container } = render(<Login />);
    expect(container.lastChild.tagName).toEqual("DIV");
  });

  // 2.
  // login submit button click - no details
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

  // login submit button click - faulty details
  test("login button click with no username or password = failure message", () => {
    const state = {
      username: "dave",
      password: "$%T",
      formError: false
    };
    const { getByText, container } = render(<Login {...state} />);
    const buttonNode = getByText("Login");
    fireEvent.click(buttonNode);
    expect(container.querySelector("form").lastChild.textContent).toEqual(
      "Your username or password was incorrect. Please try again."
    );
  });

  // 3.
  // onChange - set username or password depending on the id of the input element
  test("username input invokes handleInput function", () => {
    const { getByPlaceholderText, container } = render(<Login />);
    // input text
    const textinputNode = getByPlaceholderText("Github Username");
    fireEvent.change(textinputNode, { target: { value: "Dave" } });
    // check the text is output
    expect(container.querySelector("#username").value).toEqual("Dave");
  });
});
