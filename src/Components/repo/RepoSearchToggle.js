import React from "react";

import { ToggleButton } from "../../styles/buttons";

const RepoSearchToggle = props => {
  const { text, type, active, onClick } = props;

  return (
    <ToggleButton id={type} onClick={onClick} isActive={active}>
      {text}
    </ToggleButton>
  );
};

export default RepoSearchToggle;
