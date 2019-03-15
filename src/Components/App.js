// React
import React from "react";

// apollo
import { ApolloProvider } from "react-apollo";

// graphql client
import { graphqlClient } from "../utils/graphqlClient";

// Components
import Login from "./Login";
import Search from "./Search";
import { UserDetails } from "./UserDetails";
import { UserRepos } from "./UserRepos";
import Repository from "./Repository";

/*
if local
- use a personal access token (from env file, not committed)

if live on github
- use login form for user
- enter name and password to create a token
*/

// App
export default class App extends React.Component {
  state = {
    login: false, // logged out by default
    token: "", // from local env variable, or from github login
    username: "",
    searchType: "userdetails", // default search for a user
    suggestions: [], // autocomplete
    selectedRepo: ""
  };

  // check the environment out when component mounts
  componentDidMount() {
    // flip this around to test locally
    if (process.env.NODE_ENV === "development") {
      this.setState({ login: true, token: process.env.REACT_APP_GET_ME_IN });
    }
  }

  // routes - to be removed (probably) replaced by graphql query components
  routeForRepository(login, name) {
    return {
      title: `${login}/${name}`,
      login,
      name
    };
  }
  routeForUser(username) {
    return {
      login: username
    };
  }

  // login submit
  // - sets a token to be entered into graphql client, allowing searches
  loginSubmit = accessToken => {
    // console.log(accessToken);
    this.setState({ login: true, token: accessToken });
  };

  // search submit
  // - search user details, or repos
  searchSubmit = formDetails => {
    const { username, searchType } = formDetails;
    this.setState({ username, searchType });
  };

  render() {
    // not logged in
    if (!this.state.login) {
      return (
        <div className="container">
          <p>
            Please enter your Github username and password to start searching...
          </p>
          <p>
            - this generates a{" "}
            <a href="https://github.com/settings/tokens">
              personal access token
            </a>
          </p>
          <Login loginSubmit={this.loginSubmit} />
        </div>
      );
    }

    // render components based on state:

    // a) login => search
    // b) search

    // 1. UserDetails.js

    // 2. UserRepos.js

    // 3. Repository.js
    const { username, searchType, selectedRepo } = this.state;

    // logged in
    if (this.state.login) {
      // set token on the client
      const client = graphqlClient(this.state.token);
      return (
        <ApolloProvider client={client}>
          <div>
            <Search {...this.state} searchSubmit={this.searchSubmit} />

            {username && searchType === "userdetails" && !selectedRepo && (
              <UserDetails login={this.state.username} />
            )}

            {username && searchType === "repodetails" && !selectedRepo && (
              <UserRepos login={this.state.username} />
            )}

            {username && selectedRepo && (
              <Repository
                {...this.routeForRepository(
                  this.state.username,
                  this.state.selectedRepo
                )}
              />
            )}
          </div>
        </ApolloProvider>
      );
    }
  }
}
