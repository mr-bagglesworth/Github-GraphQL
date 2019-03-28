import React from "react";
import { SmallRepo } from "../RepoComponents/SmallRepo.js";
import { render, fireEvent, cleanup } from "react-testing-library";

describe("SmallRepo Component", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  // afterEach(cleanup);

  // submit button click
  test("SmallRepo loads h3 with props as expected", () => {
    const props = {
      createdAt: "2017-04-28T13:08:53Z",
      description: null,
      id: "MDEwOlJlcG9zaXRvcnk4OTcwNzAxMQ==",
      isFork: false,
      name: "MBGravSite",
      owner: {
        login: "mr-bagglesworth"
      },
      primaryLanguage: {
        name: "CSS",
        color: "#563d7c"
      },
      updatedAt: "2017-05-16T10:17:44Z",
      stargazers: {
        totalCount: 0
      },
      url: "https://github.com/mr-bagglesworth/MBGravSite",
      watchers: { totalCount: 1, nodes: Array(1), __typename: "UserConnection" }
    };

    const { container } = render(<SmallRepo {...props} />);

    expect(container.querySelector("h3").textContent).toEqual("MBGravSite");
  });
});
