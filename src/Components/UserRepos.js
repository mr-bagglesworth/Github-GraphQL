import React from "react";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

// Components
import SmallRepo from "./SmallRepo";

// create user repos query
// previously first: 100
const USER_REPOS_QUERY = gql`
  query UserreposQuery($login: String!) {
    user(login: $login) {
      repositories(first: 100) {
        totalCount
        edges {
          node {
            id
            name
            url
            description
            createdAt
            pushedAt
            primaryLanguage {
              name
              color
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
            id
            name
            url
            description
            createdAt
            pushedAt
            primaryLanguage {
              name
              color
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

      // maybe have a toggle between repos authored and repos contributed to
      // - may make this a class component if so
      // - only do the first repos query by default, do the contributed query on button click

      // split this into 2 components:
      // - repo count (1 query)
      // - repo list (2 queries - repos / contributed)

      // save as favourites locally
      // mutation: star or watch (or unstar or unwatch) on github (inform the user that their action will do this)

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
          {repositories.totalCount > 0 && (
            <ul>
              {repositories.edges.map(item => (
                <SmallRepo key={item.node.id} {...item.node} />
              ))}
            </ul>
          )}
        </>
      );
    }}
  </Query>
);

export { USER_REPOS_QUERY, UserRepos };
