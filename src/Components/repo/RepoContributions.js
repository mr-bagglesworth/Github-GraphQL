import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import RepoContChart from "./RepoContChart";
import { dateFormat } from "../../utils/utils";
import { RepoSection } from "../../styles/repoContainers";

// pass in timestamp of repo update
// - will get commits in a one year bracket (up to one year ago) from the date given
const CONTRIBUTIONS_QUERY = gql`
  query ContributionsQuery($login: String!, $updatedAt: DateTime!) {
    user(login: $login) {
      # id
      # name
      contributionsCollection(to: $updatedAt) {
        commitContributionsByRepository(maxRepositories: 25) {
          repository {
            name
            id
            isFork
          }
          contributions(first: 100, orderBy: { field: OCCURRED_AT, direction: ASC }) {
            totalCount
            nodes {
              commitCount
              occurredAt
            }
          }
        }
      }
    }
  }
`;

const RepoContributions = ({ login, repoId, createdAt, updatedAt, pushedAt, isFork }) => (
  <Query query={CONTRIBUTIONS_QUERY} variables={{ login, repoId, updatedAt, isFork }}>
    {({ loading, error, data }) => {
      // return loading and error first
      if (loading) return <>Loading contributions...</>;
      if (error) return <>Contribution details not found</>;
      // get data for all repos user contributed to
      const {
        user: {
          contributionsCollection: { commitContributionsByRepository }
        }
      } = data;

      // initiate content variable
      let info;

      // user has contributed to the repo
      const noContrib = commitContributionsByRepository.length === 0;
      if (noContrib) {
        info = <p>No User Contributions</p>;
      }

      // no data for forked repos
      if (isFork) {
        info = <p>No User Contributions are logged for forked repos</p>;
      }

      if (!noContrib && !isFork) {
        // catch all other cases where contributions can't be found
        if (commitContributionsByRepository.find(item => item.repository.id === repoId) === undefined) {
          info = <p>No User Contributions</p>;
        }
        // show the repo if it isn't forked
        // - repoId to match passed in as a prop
        else {
          const {
            contributions: { nodes, totalCount }
          } = commitContributionsByRepository.find(item => item.repository.id === repoId);

          info = (
            <div>
              {/* old tags for dates:
            <ul>
              {nodes.map(item => (
                <li key={item.occurredAt}>
                  {dateFormat(item.occurredAt)}
                  <span>{item.commitCount} commits</span>
                </li>
              ))}
            </ul> */}
              <RepoContChart repos={nodes} totalCount={totalCount} />
            </div>
          );
        }
      }

      return (
        <RepoSection>
          <h3>Contribution Stats:</h3>
          <p>
            Worked on from: <span>{dateFormat(createdAt)}</span> to <span>{dateFormat(updatedAt)}</span>. Last Push on:{" "}
            <span>{dateFormat(pushedAt)}</span>
          </p>
          {info}
        </RepoSection>
      );
    }}
  </Query>
);
export { CONTRIBUTIONS_QUERY, RepoContributions };
