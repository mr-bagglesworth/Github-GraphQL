import React from "react";
import RepoSizeData from "../repo/RepoSizeData.js";
import { render, cleanup } from "@testing-library/react";

// jest dom - for style
// import "jest-dom/extend-expect";
// import { toHaveStyle } from "jest-dom";

describe("RepoSizeData component", () => {
  afterEach(cleanup);

  test("RepoSizeData renders amount of code written in the correct format", () => {
    const prop = {
      disk: 43643,
      size: 1000000
    };
    const { container } = render(<RepoSizeData {...prop} />);
    expect(container.querySelector("p").textContent).toEqual("Total Code Written - 1.00 mb");
  });
});
