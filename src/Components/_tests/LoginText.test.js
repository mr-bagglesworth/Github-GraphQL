import React from "react";
import LoginText from "../LoginText.js";
import { render } from "@testing-library/react";

describe("LoginText component", () => {
  // renders if a github user is not logged in
  // - can pass in true or false, need to amend
  test("renders LoginText if a github user is logged in", () => {
    const props = {
      loginStatus: false
    };
    const { container } = render(<LoginText loginStatus={props} />);
    // const buttonNode = getByText("Authenticating with GraphQL");
    // fireEvent.click(buttonNode);
    expect(container.querySelector("p").textContent).toEqual(
      "Github GraphQL API requires a personal access token to authenticate queries, which cannot be stored on the Github Pages host securely. Your login will generate a temporary access token, which will be stored only in your browser. Find out more about Github GraphQL API below:"
    );
  });
});
