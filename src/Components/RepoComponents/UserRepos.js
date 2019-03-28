import React from "react";

// Components
import { RepoStats } from "./RepoStats";
import { RepoList } from "./RepoList";
import RepoSearchToggle from "./RepoSearchToggle";
import { LargeRepo } from "./LargeRepo";

// styles
import { Stats } from "../styles/text";
import { RepoContainer } from "../styles/repoContainers";

export default class UserRepos extends React.Component {
  // active repo id could be added here (for slide in repo expand)
  // - needs to be passed through 3 component layers for this to happen though
  state = {
    search: [
      { text: "Authored or Forked", type: "authored", active: true },
      { text: "Group Contributions", type: "contributed", active: false }
    ],
    selected: {}
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

  // get owner and repo name with onClick, then render selected repo as sibling of the ul
  // show the selected repo, and trigger slide in effect
  // - get element position on the page, and render larger repo further down the page if required
  detailsToggle = details => {
    // console.log(e);
    this.setState({ selected: details });
  };

  render() {
    const { login } = this.props;
    const { search, selected } = this.state;
    const { owner, name } = selected;

    // for RepoContainer styling
    const expanded = owner ? true : false;

    // get active search to pass to repo list
    const activeSearch = search.filter(item => item.active === true)[0].type;

    return (
      <>
        <Stats>
          <RepoStats login={login} />
          {search.map(item => (
            <RepoSearchToggle
              key={item.type}
              {...item}
              onClick={this.searchToggle}
            />
          ))}
        </Stats>
        <RepoContainer expanded={expanded}>
          <div>
            <RepoList
              login={login}
              search={activeSearch}
              onClick={this.detailsToggle}
            />
            {selected.owner && (
              <LargeRepo
                owner={owner}
                name={name}
                onClick={this.detailsToggle}
              />
            )}
          </div>
        </RepoContainer>
      </>
    );
  }
}
