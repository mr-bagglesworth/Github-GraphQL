// large repo
// - shows more details when a small repo has been clicked on
import React from "react";

// GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";

// Components
import RepoFileData from "./RepoFileData";
import RepoLangChart from "./RepoLangChart";
import UserThumbList from "../UserThumbList";
import RepoDetailToggle from "./RepoDetailToggle";

// styles
import { Container, Header, Content, Extra } from "../styles/headerContainer";

const LARGE_REPO_QUERY = gql`
  query LargeRepoQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      owner {
        login
        avatarUrl
      }
      url
      forkCount
      languages(first: 50) {
        totalCount
        totalSize
        nodes {
          color
          name
        }
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

      const { name, description, owner, url, forkCount, languages, mentionableUsers, stargazers, watchers, forks } = data.repository;

      const { avatarUrl } = owner;

      // - name
      // - link
      // - created and updated
      // - languages and colours
      // - contributors (mentionableUsers)
      // - stargazers and watchers
      // - forks

      // worth noting that:
      // - languages only look at file extensions
      // - contributors = mentionable users includes people who have commented or code reviewed, as well as written code
      // - unlike authors view, this one is already expanded
      // - thumbnails only really relevant for repos the user didn't author
      //    - thumbs get repeated
      //    - may want to rethink layout - can look awkward with a long description

      console.log(languages);
      return (
        <Container offSet={offset}>
          <Header>
            <img src={avatarUrl} alt={name} />
          </Header>
          <Content>
            <h3>{name}</h3>
            {description && <p>{description}</p>}
            {languages.totalSize > 0 && <RepoFileData {...languages} />}
            {forkCount > 0 && (
              <p>
                {forkCount} {forkCount === 1 ? "Fork" : "Forks"} of this repository
              </p>
            )}
          </Content>
          <Extra>
            {languages.totalSize > 0 && <RepoLangChart {...languages.edges} />}
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
