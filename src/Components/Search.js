// React
import React from "react";

// styles
import { BasicForm, CustomRadio, FormButton } from "./styles/forms";

// this component needs to trigger state changes in App.js:
// - username
// - suggestions
// - userdetails or repodetails

// allow the user to enter their search terms here
// - autocomplete for name search
// - dropdown with repo list after user entered name

// this should be a class component
// - keep state
// - affect state in app.js, which triggers api calls, and populates components:
// - Repository
// - UserDetails
// - UserRepos

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

  // before an autocomplete, use a button once full details are entered
  // - pass in function from props, which triggers api calls from app component
  // - api calls trigger display of different components:
  // 1. user details
  // 2. user's repos
  // -- if a user's repo is clicked, that triggers the Repository.js component
  handleSearchSubmit = e => {
    e.preventDefault();
    const { username } = this.state;
    // assuming name in state is a valie github username...
    if (username.length > 2) {
      this.props.formSubmit(this.state);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    // console.log(this.props);
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
