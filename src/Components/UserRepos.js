import React from "react";

// Components
import { RepoStats } from "./RepoStats";
import { RepoList } from "./RepoList";
import RepoToggle from "./RepoToggle";

// styles
import { Stats } from "./styles/containers";

export default class UserRepos extends React.Component {
  state = {
    search: [
      { text: "Authored or Forked", type: "authored", active: true },
      { text: "Group Contributions", type: "contributed", active: false }
    ]
  };

  searchToggle = e => {
    // get id of clicked
    const searchType = e.target.id;
    const stateCopy = JSON.parse(JSON.stringify(this.state.search));
    // update the search property of the state
    const newState = stateCopy.map(item => {
      item.active = false;
      if (item.type === searchType) {
        item.active = true;
      }
      return item;
    });
    this.setState({ search: newState });
  };

  render() {
    const { login } = this.props;
    const { search } = this.state;

    // get active search to pass to repo list
    const activeSearch = search.filter(item => item.active === true)[0].type;

    return (
      <>
        <Stats>
          <RepoStats login={login} />
          {search.map(item => (
            <RepoToggle key={item.type} {...item} onClick={this.searchToggle} />
          ))}
        </Stats>
        <RepoList login={login} search={activeSearch} />
      </>
    );
  }
}
