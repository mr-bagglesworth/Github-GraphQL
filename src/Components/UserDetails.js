import React from "react";

// GraphQL
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { dateFormat } from "../utils/utils";

// graphql - pairs a query with a component

// create username query
const UsernameQuery = gql`
  query UsernameQuery($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      createdAt
      email
      followers(first: 100) {
        totalCount
        nodes {
          name
          url
        }
      }
      following(first: 100) {
        totalCount
        nodes {
          name
          url
        }
      }
      login
      name
      pinnedRepositories(first: 10) {
        edges {
          node {
            name
            url
            description
          }
        }
      }
      repositories(first: 10) {
        edges {
          node {
            name
            url
            description
          }
        }
      }
      url
    }
  }
`;

const addUserInfo = graphql(UsernameQuery, {
  props: ({ data }) => {
    // 2nd search gets this far, then crashes
    // - this logs twice per search:
    // 1st time no user property, 2nd time has user property

    console.log(data);
    // loading state
    if (data.loading) {
      return { loading: true };
    }
    // error state
    if (data.error) {
      // console.error(data.error);
    }
    // OK state
    return { data };
  }
});

// notes on problems
// - breaks on 2nd search - button click
// - can't detect any new props in componentWillReceiveProps
// - changing username state in dev tools, then submitting doesn't fix it
// --  would suggest that changing app state onChange won't help either

// - error can't read property 'user' of undefined would suggest the username
// ...isn't getting read before the UserDetails component renders
// -- it is getting read in route for user, however

class UserDetails extends React.Component {
  state = {
    loading: true,
    username: this.props.username
  };

  // this happens last
  // - perhaps a reset here will make things work?
  componentDidUpdate(prevProps) {
    console.log("prev ", prevProps, "new ", this.props);
    // (this.props.data.variables.username !== prevProps.data.variables.username)
    // if (this.props.login !== prevProps.login) {
    // this.setState({ loading: false });
    // console.log("componentDidUpdate", this.props.loading, prevProps.loading);
    // }
  }

  // can't get user of undefined
  // - on 2nd search, 1st search is fine
  componentWillReceiveProps(newProps) {
    // console.log("this props", this.props.login);
    // console.log("new props", newProps.data.user.login);

    // if (this.props.login !== newProps.data.user.login) {
    const {
      avatarUrl,
      bio,
      createdAt,
      email,
      login,
      name,
      url,
      followers,
      following,
      repositories,
      pinnedRepositories
    } = newProps.data.user;

    // const { avatarUrl } = newProps.data.repositoryOwner;

    this.setState({
      avatarUrl,
      bio,
      createdAt: dateFormat(createdAt),
      email,
      login,
      name,
      url
    });
    // }
  }

  render() {
    // as with addUserInfo, this logs twice
    // - 1st time true
    // - 2nd time undefined
    // console.log("loading ", this.props.loading);

    const showRepo =
      this.props.loading && this.state.loading ? (
        `Loading user details...`
      ) : (
        <div>
          <div>
            <img src={this.state.avatarUrl} alt={this.state.name} />
          </div>
          <ul>
            <li>
              <h2>{this.state.name}</h2>
              <p>- {this.state.login}</p>
            </li>
            {this.state.bio && <li>{this.state.bio}</li>}
            {this.state.email && <li>{this.state.email}</li>}
            <li>Created account on: {this.state.createdAt}</li>
            <li>
              <a href={this.state.url}>{this.state.url}</a>
            </li>
          </ul>
        </div>
      );
    return <div className="container">{showRepo}</div>;
  }
}

// bind the graphql query to the component
const UserWithInfo = addUserInfo(UserDetails);
export default UserWithInfo;

// const UserDetails = (props, username) => {
//   console.log("user details ", props, username);
//   // const { username } = props;
//   // console.log(username, props);
//   return <div> This is the user details component</div>;
// };
// export default UserDetails;
