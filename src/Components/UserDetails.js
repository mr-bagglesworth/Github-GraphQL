import React from "react";

import { SmallUser } from "./SmallUser";

// - default show small user
// - on click expand user details (with LargeUser component)

export default class UserDetails extends React.Component {
  state = {
    expanded: false
  };

  detailsToggle = () => {
    const expanded = this.state.expanded;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { login } = this.props;
    const { expanded } = this.state;

    return (
      <>
        <SmallUser
          login={login}
          expanded={expanded}
          btnClick={this.detailsToggle}
        />
      </>
    );
  }
}
