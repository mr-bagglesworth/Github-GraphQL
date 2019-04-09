import React from "react";
import RepoLangChart from "../RepoComponents/RepoLangChart.js";
import { render } from "react-testing-library";

describe("RepoLangChart Component", () => {
  // render with props
  test("RepoLangChart loads with props as expected", () => {
    const props = {
      totalCount: 5,
      totalSize: 25833828,
      edges: [
        {
          node: { color: "#4F5D95", name: "PHP" },
          size: 17132993
        },
        {
          node: { color: "#563d7c", name: "CSS" },
          size: 2309098
        },
        {
          node: { color: "#f1e05a", name: "JavaScript" },
          size: 6356328
        }
      ]
    };

    const { container } = render(<RepoLangChart {...props} />);

    expect(container.querySelector("li").textContent).toEqual("PHP - 66.41%");
    expect(container.querySelector("li:nth-child(2)").textContent).toEqual("CSS - 8.95%");
    // #4F5D95 - php colour
  });
});
