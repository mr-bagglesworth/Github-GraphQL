// child component of UserRepos.js
// - shows list of repos authored (inc. forked), OR contributed to
// - has a graphql query
import React from "react";

// Components
import { SmallRepo } from "./SmallRepo";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

// repo list queries
// - load repos OR repos contributed to, based on props
// - can cut down on these queries, just totalCount stuff
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
            updatedAt
            isFork
            primaryLanguage {
              name
              color
            }
            owner {
              login
            }
            stargazers(first: 100) {
              totalCount
            }
            watchers(first: 100) {
              totalCount
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
            updatedAt
            primaryLanguage {
              name
              color
            }
            owner {
              login
            }
            stargazers(first: 100) {
              totalCount
            }
            watchers(first: 100) {
              totalCount
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

const RepoList = ({ login, search, onClick }) => (
  //   console.log(search);
  <Query query={obj[search]} variables={{ login }}>
    {({ loading, error, data }) => {
      if (loading) return <>Loading repositories...</>;
      if (error) return <>Repositories not found</>;

      // get key of repo list to render
      // - authored or contributed to
      const listKey = Object.keys(data.user)[0];
      const repoList = data.user[listKey].edges;

      return (
        <>
          {repoList.length > 0 && (
            <ul>
              {repoList.map(item => (
                <SmallRepo
                  key={item.node.id}
                  {...item.node}
                  onClick={onClick}
                />
              ))}
            </ul>
          )}
        </>
      );
    }}
  </Query>
);

export { REPOS_AUTHORED_QUERY, REPOS_CONTRIBUTED_QUERY, RepoList };
