// React
import React from "react";

// styles
import { BasicRepo } from "./styles/containers";

// GraphQL
import gql from "graphql-tag";
import { graphql } from "react-apollo"; //Query,
import { dateFormat } from "../utils/utils";

// 1. search individual repository once it is selected
// - retrieve more info that the list or repos doesn't display
const GetRepositoryInfoQuery = gql`
  query GetRepositoryIssues($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      avatarUrl
      repository(name: $name) {
        name
        description
        url
        sshUrl
        createdAt
        updatedAt
        primaryLanguage {
          id
          name
          color
        }
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  }
`;
// const GetRepositoryInfoQuery = gql`
//   query {
//     repositoryOwner(login: "mr-bagglesworth") {
//       id
//       avatarUrl
//       repositories(first: 50) {
//         edges {
//           node {
//             id
//             name
//             url
//           }
//         }
//       }
//     }
//   }
// `;

// name and repo seem to be fed in as props - through parent App.js
// - are they required here?
// - look into graphql(a, b)
const withInfo = graphql(GetRepositoryInfoQuery, {
  // options: ({ login = "mr-bagglesworth", name = "lightningTalks" }) => {
  //   return {
  //     variables: {
  //       login,
  //       name
  //     }
  //   };
  // },
  props: ({ data }) => {
    // loading state
    if (data.loading) {
      return { loading: true };
    }

    // error state
    if (data.error) {
      console.error(data.error);
    }

    // OK state
    return { data };
  }
});

// Repository
class Repository extends React.Component {
  // states
  state = {
    login: this.props.login,
    name: this.props.name,
    stargazers: 0,
    watchers: 0
  };

  // componentDidUpdate() {
  //   console.log(this.props.data);
  // const {
  //   description,
  //   url,
  //   sshUrl,
  //   createdAt,
  //   updatedAt,
  //   primaryLanguage,
  //   stargazers,
  //   watchers
  // } = this.props.data.repositoryOwner.repository;
  // // should only log once, when the data has been retrieved
  // // console.log(primaryLanguage);
  // this.setState({
  //   login: this.props.login,
  //   name: this.props.name,
  // description,
  // url,
  // sshUrl,
  // createdAt,
  // updatedAt,
  // primaryLanguage: primaryLanguage.name,
  // color: primaryLanguage.color,
  //   stargazers: stargazers.totalCount,
  //   watchers: watchers.totalCount
  // });
  // }

  // https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
  componentWillReceiveProps(newProps) {
    const {
      description,
      url,
      sshUrl,
      createdAt,
      updatedAt,
      primaryLanguage,
      stargazers,
      watchers
    } = newProps.data.repositoryOwner.repository;

    const { avatarUrl } = newProps.data.repositoryOwner;

    this.setState({
      login: this.props.login,
      name: this.props.name,
      avatarUrl,
      description,
      url,
      sshUrl,
      createdAt: dateFormat(createdAt),
      updatedAt: dateFormat(updatedAt),
      primaryLanguage: primaryLanguage.name,
      color: primaryLanguage.color,
      stargazers: stargazers.totalCount,
      watchers: watchers.totalCount
    });
  }

  render() {
    const showRepo = this.props.loading ? (
      `Loading repository...`
    ) : (
      <BasicRepo color={this.state.color}>
        <div>
          <img src={this.state.avatarUrl} alt={this.state.name} />
        </div>
        <ul>
          <li>
            <h2>
              {this.state.login}/{this.state.name}
            </h2>
          </li>
          <li>{this.state.description}</li>
          <li>
            <a href={this.state.url}>Link to repo</a>
          </li>
          <li>Created: {this.state.createdAt}</li>
          <li>Updated: {this.state.updatedAt}</li>
          <li>
            main language: {this.state.primaryLanguage}
            <span className="dot" />
          </li>
          <li>stargazers: {this.state.stargazers.toLocaleString()}</li>
          <li>watchers: {this.state.watchers.toLocaleString()}</li>
        </ul>
      </BasicRepo>
    );
    return (
      <div className="container">
        <p>render and individual repository once it has been selected...</p>
        {showRepo}
      </div>
    );
  }
}

const RepositoryWithInfo = withInfo(Repository);
export default RepositoryWithInfo;
// export default Repository;
