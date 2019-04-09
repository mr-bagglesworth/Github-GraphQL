// large repo
// - shows more details when a small repo has been clicked on

/*
notes / todos:
- languages only look at file extensions, not including markdown
- contributors = mentionable users.
  - This includes people who have commented or code reviewed, as well as written code
- need to parse out links in descriptions function required (utils)
*/
import React from "react";

// GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";

// Components
import RepoSizeData from "./RepoSizeData";
import RepoLangChart from "./RepoLangChart";
import { RepoContributions } from "./RepoContributions";
import UserThumbList from "../UserThumbList";
import RepoDetailToggle from "./RepoDetailToggle";

// styles
import { Container, Extra } from "../styles/headerContainer";
import { RepoSection } from "../styles/repoContainers";

/*
query notes
- mentionable users is not contributors. Seem to require another level of clearance for this

- diskUsage = total size of repo, RepoSizeData.js shows sum of language files user has written
  - this can give a big discrepancy, e.g. in CMSes

- commit history and sizes from a repo (to make a graph)
  - require a separate query 
  - this is a user query
  - contributions are not commits
  https://developer.github.com/v4/object/commitcontributionsbyrepository/
  - similar to contributions calendar
  
*/
const LARGE_REPO_QUERY = gql`
  query LargeRepoQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      owner {
        login
      }
      url
      forkCount
      isFork

      createdAt
      updatedAt
      pushedAt
      diskUsage

      languages(first: 50) {
        totalCount
        totalSize
        edges {
          node {
            color
            name
          }
          size
        }
      }
      mentionableUsers(first: 100) {
        totalCount
        edges {
          node {
            avatarUrl(size: 80)
            id
            login
            name
            url
          }
        }
      }
      stargazers(first: 100) {
        totalCount
        nodes {
          avatarUrl(size: 80)
          id
          login
          name
          url
        }
      }
      watchers(first: 100) {
        totalCount
        nodes {
          avatarUrl(size: 80)
          id
          login
          name
          url
        }
      }
      forks(first: 100) {
        totalCount
        nodes {
          owner {
            avatarUrl(size: 80)
            id
            login
            url
          }
        }
      }
    }
  }
`;

const LargeRepo = ({ owner, name, offset, onClick }) => (
  <Query query={LARGE_REPO_QUERY} variables={{ owner, name }}>
    {({ loading, error, data }) => {
      // return loading and error first
      if (loading) return <>Loading extra repo details...</>;
      if (error) return <>Extra repo details not found</>;

      const {
        id,
        name,
        description,
        owner,
        url,
        //
        createdAt,
        updatedAt,
        pushedAt,
        //
        diskUsage,
        languages,
        mentionableUsers,
        stargazers,
        watchers,
        forks,
        isFork
      } = data.repository;

      // RepoSizeData.js
      // - language file size + space on disk
      const { totalSize } = languages;
      const sizeData = { disk: diskUsage * Math.pow(10, 3), size: totalSize };

      // RepoContributions.js
      // - gets contributions to the repo within the past year
      // - no contributions are logged on forked repos, or group repos
      const { login } = owner;
      const repoId = id;
      const contribData = { login, repoId, createdAt, updatedAt, pushedAt, isFork };

      return (
        <Container offSet={offset}>
          <Extra>
            <h2>{name}</h2>
            {description && <p>{description}</p>}
            {languages.totalSize > 0 && <RepoSizeData {...sizeData} />}
            {languages.totalSize > 0 && <RepoLangChart {...languages} />}

            <RepoContributions {...contribData} />
            <RepoSection>
              {mentionableUsers.totalCount > 0 && (
                <>
                  <h4>Contributors:</h4>
                  <UserThumbList thumbs={mentionableUsers.edges} type={"collaborators"} />
                </>
              )}
              {stargazers.totalCount > 0 && (
                <>
                  <h4>Stargazers:</h4>
                  <UserThumbList thumbs={stargazers.nodes} />
                </>
              )}
              {watchers.totalCount > 0 && (
                <>
                  <h4>Watchers:</h4>
                  <UserThumbList thumbs={watchers.nodes} />
                </>
              )}
              {forks.totalCount > 0 && (
                <>
                  <h4>Forked by:</h4>
                  <UserThumbList thumbs={forks.nodes} type={"forks"} />
                </>
              )}
            </RepoSection>
            <p>
              <a href={url}>Link to Repo ></a>
            </p>
            <RepoDetailToggle onClick={onClick} direction={"backwards"} />
          </Extra>
        </Container>
      );
    }}
  </Query>
);

export { LARGE_REPO_QUERY, LargeRepo };
