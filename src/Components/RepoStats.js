// child component of UserRepos.js
// - shows repos created, forked and contributed to
// - has a graphql query
import React from "react";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

// repo stats query
const REPO_STATS_QUERY = gql`
  query RepostatsQuery($login: String!) {
    user(login: $login) {
      repositories(first: 100) {
        totalCount
        edges {
          node {
            isFork
          }
        }
      }
      repositoriesContributedTo(first: 100) {
        totalCount
      }
    }
  }
`;

const RepoStats = ({ login }) => (
  <Query query={REPO_STATS_QUERY} variables={{ login }}>
    {({ loading, error, data }) => {
      if (loading) return <>Loading user's statistics...</>;
      if (error) return <>Statistics not found</>;

      // get the different repo types
      const { repositories, repositoriesContributedTo } = data.user;
      // forked and non-forked
      const forkedRepoCount = repositories.edges.filter(
        item => item.node.isFork
      ).length;
      const nonForkedCount = repositories.totalCount - forkedRepoCount;

      return (
        <>
          {(repositories.totalCount > 0 ||
            repositoriesContributedTo.totalCount > 0) && (
            <div>
              {repositories.totalCount > 0 &&
                `${nonForkedCount} repositories authored, ${forkedRepoCount} repositories forked`}
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

export { REPO_STATS_QUERY, RepoStats };
