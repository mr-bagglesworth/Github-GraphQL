// React
import React from "react";

// apollo
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// Components
import Search from "./Search";
import { UserDetails } from "./UserDetails";
import UserRepos from "./UserRepos";
import Repository from "./Repository";

// authorisation / login details
const accessToken = process.env.REACT_APP_GET_ME_IN;

// setup httplink and cache
const httpLink = new HttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer ${accessToken}`
  }
});
const cache = new InMemoryCache();

// specify link and cache properties on graphql config object
const client = new ApolloClient({
  link: httpLink,
  cache
});

// App
export default class App extends React.Component {
  state = {
    login: true, // was false
    username: "", //"mr-bagglesworth"// populate on user click from suggestions. Breaks if username not valid
    searchType: "userdetails", //"userdetails" // populate on radio button click, this is the default, alternate = repodetails
    suggestions: [], // populate on type ahead
    selectedRepo: "" //"Beginner-Sass-Workshop" // populate on user click of results item, triggers api call
  };

  routeForRepository(login, name) {
    return {
      title: `${login}/${name}`,
      login,
      name
    };
  }

  // convert this.state.username to pass in to graphql query
  routeForUser(username) {
    return {
      login: username
    };
  }

  // form submit, 2 options:
  // 1. user details
  // 2. user's repos
  formSubmit = formDetails => {
    const { username, searchType } = formDetails;
    this.setState({ username, searchType });
  };

  render() {
    // Log in state
    if (!this.state.login) {
      return (
        <div className="container">
          <p>Please enter your details in config.js to login to Github...</p>
          <p>...Either that or your internet is down</p>
        </div>
      );
    }

    // render components based on state:
    // 1. UserDetails.js

    // 2. UserRepos.js

    // 3. Repository.js
    const { username, searchType, selectedRepo } = this.state;

    return this.state.login ? (
      <ApolloProvider client={client}>
        <div>
          <Search {...this.state} formSubmit={this.formSubmit} />

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
    ) : (
      <p>Logging in...</p>
    );
  }
}
