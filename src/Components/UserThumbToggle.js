// round user thumbnails
import React from "react";

// styles
import { ThumbButton } from "./styles/containers";

const UserThumbToggle = props => {
  const { more, onClick } = props;

  return (
    <ThumbButton>
      <button onClick={onClick}>
        + {more} more
        <svg
          aria-labelledby={more}
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <title id={more} lang="en">
            {more}
          </title>

          <path d="M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z" />
        </svg>
      </button>
    </ThumbButton>
  );
};

export default UserThumbToggle;
