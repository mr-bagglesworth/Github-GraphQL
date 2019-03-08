// React
import React from "react";

// Apollo
import { ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";

// Auth
import { login } from "./githubLogin";
import { username, password } from "./config";

// App.Components
import Search from "./Search";
import Repository from "./Repository";

// Global.Auth
let TOKEN = null;

// Global.Apollo
const networkInterface = createNetworkInterface(
  "https://api.github.com/graphql"
);

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      // Send the login token in the Authorization header
      req.options.headers.authorization = `Bearer ${TOKEN}`;
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

// App
export default class App extends React.Component {
  state = {
    login: false,
    suggestions: [], // populate on type ahead
    username: "mr-bagglesworth", // populate on user click from suggestions. Breaks if username not valid
    searchType: "userdetails", // populate on radio button click, this is the default, alternate = repodetails
    selectedRepo: "Beginner-Sass-Workshop" // populate on user click of results item, triggers api call
  };

  componentDidMount() {
    if (username === "xxx") {
      throw new Error(
        "Please create a config.js with your Github username and password."
      );
    }
    login(username, password).then(token => {
      TOKEN = token;
      this.setState({ login: true });
    });
  }

  routeForRepository(login, name) {
    return {
      title: `${login}/${name}`,
      component: Repository,
      login,
      name
    };
  }

  render() {
    // Log in state
    if (!this.state.login) {
      return <p>Please login to Github with your details in config.js...</p>;
    }

    // render components based on state:
    // - suggestions empty, show search
    return this.state.login ? (
      <ApolloProvider client={client}>
        <div>
          <Search />
          <Repository
            {...this.routeForRepository(
              this.state.username,
              this.state.selectedRepo
            )}
          />
        </div>
      </ApolloProvider>
    ) : (
      <p>Logging in...</p>
    );
  }
}
