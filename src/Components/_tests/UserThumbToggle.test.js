import React from "react";
import UserThumbToggle from "../UserThumbToggle.js";
import { render, cleanup } from "react-testing-library";

describe("UserThumbToggle Component", () => {
  afterEach(cleanup);

  // render with props as expected
  test("RepoSearchToggle renders with more text '+ 49 more'", () => {
    const expandThumb = { more: 49 };

    const { container } = render(<UserThumbToggle {...expandThumb} />);
    expect(container.getElementsByTagName("svg")[0].textContent).toEqual("49");
  });
});
