// React
import React from "react";

// authorisation / login details
import { login } from "../config/githubLogin";
import { username, password } from "../config/config";

// apollo
import { ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";
// trying to update to apollo 2.0+
// - doesn't like it, trouble getting authentication to work correctly
// import { createHttpLink, HttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";
// import { InMemoryCache } from "apollo-cache-inmemory";

// Components
import Search from "./Search";
import Repository from "./Repository";

// Global.Auth
let TOKEN = null;

// Global.Apollo
const networkInterface = createNetworkInterface(
  "https://api.github.com/graphql"
);

// add login token
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
// console.log(client);

// new version
// const httpLink = createHttpLink({
//   uri: "https://api.github.com/graphql"
// });
// const middlewareLink = setContext(() => ({
//   headers: {
//     authorization: `Bearer ${TOKEN}` || null
//   }
// }));

// const link = middlewareLink.concat(httpLink);

// const client = new ApolloClient({
//   link: new HttpLink({ uri: link })
// });
// console.log(client);

// const client = new ApolloClient({
//   link: new HttpLink({ uri: "https://api.github.com/graphql" }),
//   cache: new InMemoryCache()
// });

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
      return (
        <div className="container">
          <p>Please enter your details in config.js to login to Github...</p>
        </div>
      );
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
