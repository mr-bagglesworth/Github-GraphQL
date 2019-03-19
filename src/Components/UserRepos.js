import React from "react";

// Components
import { RepoStats } from "./RepoStats";
import { RepoList } from "./RepoList";

// styles
import { SmallButton } from "./styles/buttons";
import { Stats } from "./styles/containers";

export default class UserRepos extends React.Component {
  state = {
    search: "authored"
  };

  searchToggle = e => {
    const searchType = e.target.id;
    this.setState({ search: searchType });
  };

  render() {
    const { login } = this.props;
    const { search } = this.state;
    return (
      <>
        <Stats>
          <RepoStats login={login} />
          <SmallButton id="authored" onClick={this.searchToggle}>
            Authored or Forked
          </SmallButton>
          <SmallButton id="contributed" onClick={this.searchToggle}>
            Group Contributions
          </SmallButton>
        </Stats>
        <RepoList login={login} search={search} />
      </>
    );
  }
}
