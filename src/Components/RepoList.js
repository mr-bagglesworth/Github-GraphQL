// child component of UserRepos.js
// - shows list of repos authored (inc. forked), OR contributed to
// - has a graphql query
import React from "react";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

import SmallRepo from "./SmallRepo";

// repo list queries
// - load repos OR repos contributed to, based on props
const REPOS_AUTHORED_QUERY = gql`
  query ReposAuthoredQuery($login: String!) {
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
            isFork
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
    }
  }
`;

const REPOS_CONTRIBUTED_QUERY = gql`
  query ReposContributedQuery($login: String!) {
    user(login: $login) {
      repositoriesContributedTo(first: 100, includeUserRepositories: false) {
        totalCount
        edges {
          node {
            id
            name
            url
            description
            createdAt
            isFork
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

// pick a query to run, based on search prop
const obj = {
  authored: REPOS_AUTHORED_QUERY,
  contributed: REPOS_CONTRIBUTED_QUERY
};

const RepoList = ({ login, search }) => (
  //   console.log(search);
  <Query query={obj[search]} variables={{ login }}>
    {({ loading, error, data }) => {
      if (loading) return <>Loading repositories...</>;
      if (error) return <>Repositories not found</>;

      // get key of repo list to render
      const listKey = Object.keys(data.user)[0];
      const repoList = data.user[listKey].edges;

      // separate component for authored by repo?
      // - or pass in a prop that says so
      // + author thumbnails

      return (
        <>
          {repoList.length > 0 && (
            <ul>
              {repoList.map(item => (
                <SmallRepo key={item.node.id} {...item.node} />
              ))}
            </ul>
          )}
        </>
      );
    }}
  </Query>
);

export { REPOS_AUTHORED_QUERY, REPOS_CONTRIBUTED_QUERY, RepoList };
