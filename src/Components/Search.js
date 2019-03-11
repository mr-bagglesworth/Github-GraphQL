// React
import React from "react";

// github username regex
// - doesn't seem to work, so uninstalled. Left as a temporary reference
// import githubUsernameRegex from "github-username-regex";

// styles
import { BasicForm, CustomRadio, FormButton } from "./styles/forms";

// this component triggers state changes in App.js:
// - username
// - suggestions
// - userdetails or repodetails

// this then triggers api calls, and populates components:
// - Repository
// - UserDetails
// - UserRepos

// users enters their search terms in input field
// - autocomplete for name search (ideally)
// --- Might have to search by username onChange, rather than full list of github usernames, however
// - dropdown with repo list after user entered name

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

  // search button to search by:
  // 1. user details
  // 2. user's repos
  // -- if a user's repo is clicked, that triggers the Repository.js component
  handleSearchSubmit = e => {
    e.preventDefault();
    const { username } = this.state;
    // UserDetails component errors if the username isn't found
    // - githubusername regex didn't work too well on first go
    if (username.length > 2) {
      this.props.formSubmit(this.state);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Github GraphQL API</h1>
        <p>Search Github users and their repositories with GraphQL API</p>
        <BasicForm>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" onChange={this.handleUserName} />
          </div>
          <div>
            <div>
              <CustomRadio htmlFor="userdetails">
                Get User's Details
                <input
                  type="radio"
                  name="userdetails"
                  id="userdetails"
                  checked={this.state.searchType === "userdetails"}
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
                  checked={this.state.searchType === "repodetails"}
                  onChange={this.handleSearchType}
                />
                <span />
              </CustomRadio>
            </div>
            <div>
              <FormButton
                type="submit"
                value="Submit"
                onClick={e => this.handleSearchSubmit(e)}
              />
            </div>
          </div>
          {this.state.formError && <p>Please enter a valid username</p>}
        </BasicForm>
      </div>
    );
  }
}
