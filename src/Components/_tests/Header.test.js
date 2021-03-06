import React from "react";
import Header from "../Header.js";
import { render, cleanup } from "@testing-library/react";

// jest dom - for style
import "@testing-library/jest-dom/extend-expect";
import { toHaveStyle } from "@testing-library/jest-dom";

describe("Header component", () => {
  // unmount and cleanup DOM after each test is finished
  afterEach(cleanup);

  // 1.
  // h1 colours - logged in and out
  test("header h1 is blue when logged in", () => {
    const { container } = render(<Header loginStatus={true} />);
    expect(container.querySelector("h1")).toHaveStyle("color: #0348a3");
  });

  test("header h1 is pink when logged out", () => {
    const { container } = render(<Header loginStatus={false} />);
    expect(container.querySelector("h1")).toHaveStyle("color: #c91f6c");
  });
});
