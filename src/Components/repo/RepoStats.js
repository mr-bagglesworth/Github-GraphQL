import React from "react";
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
      if (loading) return <div>Loading user's statistics...</div>;
      if (error) return <div>Statistics not found</div>;

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
