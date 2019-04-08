// RepoContributions.js
// - get a user's contibutions to different repositories
import React from "react";

// GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";

// utils and styles
import { dateFormat } from "../../utils/utils";
import { RepoSection } from "../styles/repoContainers";

// pass in timestamp of repo update
// - will get commits in a one year bracket from the date given
const CONTRIBUTIONS_QUERY = gql`
  query ContributionsQuery($login: String!, $updatedAt: DateTime!) {
    user(login: $login) {
      # id
      # name
      contributionsCollection(to: $updatedAt) {
        commitContributionsByRepository(maxRepositories: 100) {
          repository {
            name
            id
          }
          contributions(first: 100) {
            totalCount
            nodes {
              commitCount
              occurredAt
              # repository{
              #   id
              #   name
              # }
            }
          }
        }
      }
    }
  }
`;

const RepoContributions = ({ login, repoId, createdAt, updatedAt, pushedAt }) => (
  <Query query={CONTRIBUTIONS_QUERY} variables={{ login, repoId, updatedAt }}>
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

      // if user has actually contributed to the repo in question
      const hasContrib = commitContributionsByRepository.length > 0;

      let info;
      if (!hasContrib) {
        info = "No User Contributions";
      }
      // repoId to match passed in as a prop
      // - plot out the commit chart here
      // - take into account spacing of dates + commit counts
      else {
        const {
          contributions: { nodes }
        } = commitContributionsByRepository.find(item => item.repository.id === repoId);
        info = (
          <ul>
            {nodes.map(item => (
              <li key={item.occurredAt}>{item.commitCount}</li>
            ))}
          </ul>
        );
      }

      return (
        <RepoSection>
          <h3>Contributions to this repo</h3>
          <p>
            {dateFormat(createdAt)} to {dateFormat(updatedAt)}
          </p>
          <p>Last Push: {dateFormat(pushedAt)}</p>
          {info}
        </RepoSection>
      );
    }}
  </Query>
);
export { CONTRIBUTIONS_QUERY, RepoContributions };
