import React from "react";
import RepoFileData from "../RepoComponents/RepoFileData.js";
import { render, cleanup } from "react-testing-library";

// jest dom - for style
// import "jest-dom/extend-expect";
// import { toHaveStyle } from "jest-dom";

describe("RepoFileData component", () => {
  afterEach(cleanup);

  test("RepoFileData renders a language name from props", () => {
    const props = {
      totalCount: 2,
      totalSize: 1369,
      nodes: [{ color: "#e34c26", name: "HTML" }, { color: "#563d7c", name: "CSS" }],
      totalCount: 2,
      totalSize: 1369
    };
    const { container } = render(<RepoFileData {...props} />);
    expect(container.querySelector("li:first-child").textContent).toEqual("HTML");
  });

  // rgb(86, 61, 124) = #563d7c = purple
});
