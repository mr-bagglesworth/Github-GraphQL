import React from "react";

// styles
import { ExpandButton } from "../../styles/buttons";

// works with state for expanded  in UserDetails.js
const UserToggle = props => {
  const { expanded, onClick } = props;
  const text = !expanded ? "Show More" : "Show Less";

  return (
    <ExpandButton onClick={onClick} expanded={expanded}>
      {text}
    </ExpandButton>
  );
};

export default UserToggle;
