// React
import React from "react";

// apollo
import { ApolloProvider } from "react-apollo";

// graphql client
import { graphqlClient } from "../utils/graphqlClient";

// Components
import Header from "./Header";
import Login from "./Login";
import Search from "./Search";
import UserDetails from "./UserComponents/UserDetails";
import UserRepos from "./RepoComponents/UserRepos";

// colour - for background
import styleVars from "./styles/styleVars";
const { colors } = styleVars;

// App
export default class App extends React.Component {
  state = {
    login: false, // logged out by default
    token: "", // from local env variable, or from github login
    username: "",
    searchType: "userdetails", // default search for a user
    suggestions: [] // autocomplete
  };

  // check the environment, and set the token when component mounts
  componentDidMount() {
    // local
    if (process.env.NODE_ENV === "development") {
      this.setState({ login: true, token: process.env.REACT_APP_GET_ME_IN });
    }
    // github
    // - if the correct token is in sessionStorage, set it
    else {
      const tokenKey = Object.keys(sessionStorage).find(item =>
        item.startsWith("githubGraphQL")
      );
      const token = sessionStorage[tokenKey];
      if (token) this.setState({ login: true, token });
    }
  }

  // logout
  // - remove token from sessionStorage
  logoutSubmit = () => {
    const tokenKey = Object.keys(sessionStorage).find(item =>
      item.startsWith("githubGraphQL")
    );
    sessionStorage.removeItem(tokenKey);
    this.setState({ login: false, token: "" });
  };

  // login submit
  // - sets a token to be entered into graphql client, allowing searches
  // - add token to sessionStorage - user won't have to login on page refresh
  loginSubmit = accessToken => {
    sessionStorage.setItem(`githubGraphQL`, accessToken);
    this.setState({ login: true, token: accessToken });
  };

  // search submit
  // - search user details, or repos
  searchSubmit = formDetails => {
    const { username, searchType } = formDetails;
    this.setState({ username, searchType });
  };

  render() {
    const { login, username, searchType, token } = this.state;

    // logged out
    // - set background gradient to pink
    const bgGrad = !login ? colors.bgPink : colors.bgBlue;
    document.body.style.background = `linear-gradient(215deg, ${bgGrad}, rgba(255, 255, 255, 0.65)), linear-gradient(65deg, ${bgGrad}, rgba(255, 255, 255, 0.35))`;

    // logged in
    // - convert token to graphql client
    const client = token ? graphqlClient(token) : "";

    // conditional rendering, based on login status
    // - if logged in, render result components based on state:
    // 1. UserDetails.js
    // 2. UserRepos.js
    const pageContent = !login ? (
      <>
        <p>Enter your Github username and password to start searching.</p>
        <Login loginSubmit={this.loginSubmit} loginStatus={login} />
      </>
    ) : (
      <>
        <p>Enter a valid Github username to start searching...</p>
        <Search
          {...this.state}
          searchSubmit={this.searchSubmit}
          loginStatus={login}
        />
        <ApolloProvider client={client}>
          {username && searchType === "userdetails" && (
            <UserDetails login={username} />
          )}

          {username && searchType === "repodetails" && (
            <UserRepos login={username} />
          )}
        </ApolloProvider>
      </>
    );

    // check if Header is rendered twice if props don't change
    // - look at pure components, and shouldComponentUpdate() if so
    return (
      <div className="container">
        <Header loginStatus={login} logoutSubmit={this.logoutSubmit} />
        {pageContent}
      </div>
    );
  }
}
