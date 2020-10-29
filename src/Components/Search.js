import React from "react";

import { SearchForm, TextInput, CustomRadio } from "../styles/forms";
import { Button } from "../styles/buttons";

// Search.js triggers api calls, and populates components, based on its state:
// - Repository
// - UserDetails
// - UserRepos

// possible autocomplete (name search):
// - search by username onChange
// - search based on text input val

export default class Search extends React.Component {
  state = {
    username: "",
    searchType: this.props.searchType,
    formError: false
  };

  // text input takes username input
  // - for users with lots of repos, a second search may be more appropriate
  handleUserName = e => {
    this.setState({ username: e.target.value });
  };

  // search for user details, or a specific user's repos
  handleSearchType = e => {
    this.setState({ searchType: e.target.id });
  };

  // Submit passes triggers different search types in other components
  handleSearchSubmit = e => {
    e.preventDefault();
    const { username } = this.state;

    // githubusername regex didn't work too well, make username +2 characters
    if (username.length > 2) {
      this.props.searchSubmit(this.state);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    const { loginStatus } = this.props;
    const { searchType, formError } = this.state;
    return (
      <SearchForm>
        <div>
          <label htmlFor="username">Username</label>
          <TextInput
            id="username"
            type="text"
            onChange={this.handleUserName}
            loginStatus={loginStatus}
          />
        </div>
        <div>
          <div>
            <CustomRadio htmlFor="userdetails">
              Get User's Details
              <input
                type="radio"
                name="userdetails"
                id="userdetails"
                checked={searchType === "userdetails"}
                onChange={this.handleSearchType}
              />
              <span />
            </CustomRadio>
            <CustomRadio htmlFor="repodetails">
              Get User's Repositories
              <input
                type="radio"
                name="repodetails"
                id="repodetails"
                checked={searchType === "repodetails"}
                onChange={this.handleSearchType}
              />
              <span />
            </CustomRadio>
          </div>
          <div>
            <Button
              loginStatus={loginStatus}
              type="submit"
              value="Submit"
              onClick={e => this.handleSearchSubmit(e)}
            />
          </div>
        </div>
        {formError && <p>Please enter a valid username</p>}
      </SearchForm>
    );
  }
}
