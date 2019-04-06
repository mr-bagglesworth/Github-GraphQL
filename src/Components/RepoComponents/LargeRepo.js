// large repo
// - shows more details when a small repo has been clicked on
// - not quite the same as users, want the card to slide in to view
import React from "react";

// - name
// - link
// - created and updated
// - languages and colours
// - contributors (mentionableUsers)
// - stargazers and watchers
// - forks

// worth noting that:
// - languages only look at file extensions

// RepoDetailToggle
// - pass in a prop to show the position on the page
// - large repo renders at the top of the page, needs to render beside clicked repo

// GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";

// Components
import RepoFileData from "./RepoFileData";
import UserThumbList from "../UserThumbList";
import RepoDetailToggle from "./RepoDetailToggle";

// utils
// import { dateFormat } from "../../utils/utils";

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
    }
  }
`;

const LargeRepo = ({ owner, name, offset, onClick }) => (
  <Query query={LARGE_REPO_QUERY} variables={{ owner, name }}>
    {({ loading, error, data }) => {
      // return loading and error first
      if (loading) return <>Loading extra repo details...</>;
      if (error) return <>Extra repo details not found</>;

      const { name, description, owner, url, forkCount, mentionableUsers, languages, stargazers, watchers } = data.repository;

      const { avatarUrl } = owner;
      // console.log(mentionableUsers, stargazers);
      // - mentionable users to be treated differently

      // if not authored search, use header container
      return (
        <Container offSet={offset}>
          <Header>
            <img src={avatarUrl} alt={name} />
          </Header>
          <Content>
            <h3>{name}</h3>
            <p>{description}</p>
            <RepoFileData {...languages} />
            <p>
              {forkCount > 0 && forkCount}
              {forkCount > 0 && " Forks of this repository"}
            </p>
          </Content>
          <Extra>
            {mentionableUsers.totalCount > 0 && <h3>Contributors:</h3>}
            {mentionableUsers.totalCount > 0 && <UserThumbList thumbs={mentionableUsers.edges} collaborators={true} />}
            {stargazers.totalCount > 0 && <h3>Stargazers:</h3>}
            {stargazers.totalCount > 0 && <UserThumbList thumbs={stargazers.nodes} />}
            {watchers.totalCount > 0 && <h3>Watchers:</h3>}
            {watchers.totalCount > 0 && <UserThumbList thumbs={watchers.nodes} />}
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
