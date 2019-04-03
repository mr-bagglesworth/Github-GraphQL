import React from "react";

// styles
import { ArrowButton } from "../styles/buttons";

// slides between SmallRepo and LargeRepo
const RepoDetailToggle = props => {
  const { owner, name, direction, onClick } = props;
  // pass in e for the offset position
  return (
    <ArrowButton onClick={e => onClick({ owner, name }, e)}>
      <svg
        aria-labelledby={name}
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <title id={name} lang="en">
          {name}
        </title>
        {direction === "forwards" && (
          <path d="M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z" />
        )}
        {direction === "backwards" && (
          <path d="M30.83 14.83L28 12 16 24l12 12 2.83-2.83L21.66 24z" />
        )}
      </svg>
    </ArrowButton>
  );
};

export default RepoDetailToggle;
