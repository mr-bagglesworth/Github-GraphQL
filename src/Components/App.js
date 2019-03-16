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
import { UserDetails } from "./UserDetails";
import { UserRepos } from "./UserRepos";
import Repository from "./Repository";

// colour - for background
import styleVars from "./styles/styleVars";
const { colors } = styleVars;

/*
if local
- use a personal access token (from env file, not committed)

if live on github
- use login form for user
- enter name and password to create a token

todo
- restructure to not render header twice
  - (may just be because it needs to re-render to add login header)
  - PureComponent and shouldComponentUpdate(), if so
- token in sessionStorage
- token encrypted
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
    // - also try to get a token from local or session storage - if user is logged in
    if (process.env.NODE_ENV === "development9") {
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

  logoutSubmit = () => {
    this.setState({ login: false, token: "" });
  };

  // login submit
  // - sets a token to be entered into graphql client, allowing searches
  loginSubmit = accessToken => {
    this.setState({ login: true, token: accessToken });
  };

  // search submit
  // - search user details, or repos
  searchSubmit = formDetails => {
    const { username, searchType } = formDetails;
    this.setState({ username, searchType });
  };

  render() {
    const { login, username, searchType, selectedRepo, token } = this.state;

    // logged out
    // - set background gradient to pink
    const bgGrad = !login ? colors.bgPink : colors.bgBlue;
    document.body.style.background = `linear-gradient(212deg, ${bgGrad}, white)`;

    // logged in
    // - convert token to graphql client
    const client = token ? graphqlClient(token) : "";

    // conditional rendering
    // - based on login status
    // - if logged in, render result components based on state:
    // 1. UserDetails.js
    // 2. UserRepos.js
    // 3. Repository.js
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
          {username && searchType === "userdetails" && !selectedRepo && (
            <UserDetails login={username} />
          )}

          {username && searchType === "repodetails" && !selectedRepo && (
            <UserRepos login={username} />
          )}

          {username && selectedRepo && (
            <Repository {...this.routeForRepository(username, selectedRepo)} />
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
