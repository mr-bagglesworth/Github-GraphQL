import React from "react";
import RepoToggle from "../RepoToggle.js";
import { render, cleanup } from "react-testing-library";

// jest dom - for style
import "jest-dom/extend-expect";
import { toHaveStyle } from "jest-dom";

describe("RepoToggle component", () => {
  afterEach(cleanup);
  /* can test if:
  - renders the right colour with certain props
  - function is passed in and works?
  */
  test("RepoToggle renders correct text with authored repos active", () => {
    const item = { text: "Authored or Forked", type: "authored", active: true };

    const { container } = render(<RepoToggle {...item} />);
    expect(container.textContent).toEqual("Authored or Forked");
  });

  test("RepoToggle renders correct colour with authored repos inactive", () => {
    const item = {
      text: "Authored or Forked",
      type: "authored",
      active: false
    };
    const { container } = render(<RepoToggle {...item} />);
    expect(container.querySelector("button")).toHaveStyle(
      "background-color: grey"
    );
  });
});
