import React from "react";
import Search from "../Search.js";
import {
  render,
  fireEvent,
  cleanup
  // waitForElement
} from "react-testing-library";

describe("Search Component", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  // afterEach(cleanup);

  // submit button click
  test("submit button click with no username = please enter a valid username message", () => {
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

  // can't really test radio button click
  // - only thing that changes is the css
  // - can't test for css, not tied to html

  // need to wait for search to be performed by userdetails component
  // - can't seem to do that with global.fetch

  // test a user result
  // const userHeading = `<h2><a href="https://github.com/mr-bagglesworth">Mr Bagglesworth</a></h2>`;

  // global.fetch = jest
  //   .fn()
  //   .mockImplementation(() =>
  //     Promise.resolve({ text: () => Promise.resolve(userHeading) })
  //   );

  // test user search
  // test("user search returns requested heading", () => {
  //   const state = {
  //     username: "",
  //     searchType: "userdetails",
  //     formError: false
  //   };
  //   const { getByText, getByLabelText, getByTestId, container } = render(
  //     <Search {...state} />
  //   );

  //   // get button and input
  //   const buttonNode = getByText("Submit");
  //   const input = getByLabelText("Username");

  //   // set values and fire events
  //   input.value = `getByLabelText`;
  //   fireEvent.change(input);
  //   fireEvent.click(buttonNode);

  // expect fetch to have been called once
  // expect(global.fetch).toHaveBeenCalledTimes(1);

  // return waitForElement(() => container).then(output =>
  //   expect(output.querySelector("ul").firstElementChild).toEqual(userHeading)
  // );
  // return waitForElement(() => container).then(output =>
  //   expect(output).toEqual(userHeading)
  // );
  // });
});

// json representation of dom nodes in react test renderer
// https://itnext.io/testing-react-16-3-components-with-react-test-renderer-without-enzyme-d9c65d689e88
