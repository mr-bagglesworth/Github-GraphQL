import React from "react";
import UserThumb from "../UserThumb.js";
import { render } from "react-testing-library";

describe("UserThumb Component", () => {
  // render with props as expected
  test("UserThumb renders with prop for user: mr-bagglesworth", () => {
    const prop = {
      avatarUrl: "https://avatars0.githubusercontent.com/u/28146666?s=80&v=4",
      login: "mr-bagglesworth",
      name: "Mr Bagglesworth",
      url: "https://github.com/mr-bagglesworth"
    };

    const { container } = render(<UserThumb {...prop} />);
    expect(container.querySelector("p").textContent).toEqual("Mr Bagglesworth");
  });
});
