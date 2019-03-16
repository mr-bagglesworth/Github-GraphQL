import React from "react";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

// utils
// import { dateFormat } from "../utils/utils";

// create user repos query
// previously first: 100
const USER_REPOS_QUERY = gql`
  query UserreposQuery($login: String!) {
    user(login: $login) {
      repositories(first: 10) {
        totalCount
        edges {
          node {
            name
            url
            description
            createdAt
            pushedAt
            primaryLanguage {
              name
            }
            stargazers(first: 100) {
              totalCount
              nodes {
                name
                login
                url
              }
            }
            watchers(first: 100) {
              totalCount
              nodes {
                name
                login
                url
              }
            }
          }
        }
      }
      repositoriesContributedTo(first: 100) {
        totalCount
        edges {
          node {
            name
            url
            description
            createdAt
            pushedAt
            primaryLanguage {
              name
            }
            owner {
              url
            }
            stargazers(first: 100) {
              totalCount
              edges {
                node {
                  name
                  login
                  url
                }
              }
            }
            watchers(first: 100) {
              totalCount
              edges {
                node {
                  name
                  login
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const UserRepos = ({ login }) => (
  <Query query={USER_REPOS_QUERY} variables={{ login }}>
    {({ loading, error, data }) => {
      if (loading) return <>Loading user's repositories...</>;
      if (error) return <>Username not found</>;

      const { repositories, repositoriesContributedTo } = data.user;

      // console.log("repo list ", data);
      // need to pull out the same information from each of the above, more or less
      // - find a way to modularise

      return (
        <>
          {(repositories.totalCount > 0 ||
            repositoriesContributedTo.totalCount > 0) && (
            <div>
              {repositories.totalCount > 0 &&
                `${repositories.totalCount} repositories created`}
              {repositoriesContributedTo.totalCount > 0 &&
                `, and ${
                  repositoriesContributedTo.totalCount
                } repositories contributed to`}
            </div>
          )}
        </>
      );
    }}
  </Query>
);

export { USER_REPOS_QUERY, UserRepos };
