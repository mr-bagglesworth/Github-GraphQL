import React from "react";

// styles
import { ToggleButton } from "./styles/buttons";

// works with user repo search types in UserRepos.js
const RepoToggle = props => {
  const { text, type, active, onClick } = props;

  return (
    <ToggleButton id={type} onClick={onClick} isActive={active}>
      {text}
    </ToggleButton>
  );
};

export default RepoToggle;
