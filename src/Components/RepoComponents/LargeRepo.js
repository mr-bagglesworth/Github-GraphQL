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
import UserThumb from "../UserThumb";
import RepoDetailToggle from "./RepoDetailToggle";

// utils
// import { dateFormat } from "../../utils/utils";

// styles
// import { RepoDetail, RepoHeader } from "../styles/repoContainers";
import { Container, Header, Content, Extra } from "../styles/headerContainer";
// Content,
//   Button,
//   Extra

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
      isPrivate
      languages(first: 50) {
        totalCount
        totalSize
        nodes {
          color
          name
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

const LargeRepo = ({ owner, name, onClick }) => (
  <Query query={LARGE_REPO_QUERY} variables={{ owner, name }}>
    {({ loading, error, data }) => {
      // return loading and error first
      if (loading) return <>Loading extra repo details...</>;
      if (error) return <>Extra repo details not found</>;

      const {
        name,
        description,
        owner,
        // url,
        forkCount,
        // isPrivate,
        // languages,
        stargazers,
        watchers
      } = data.repository;

      // console.log(data.repository);
      const { avatarUrl } = owner;

      // if not authored search, use header container
      return (
        <Container>
          <Header>
            <img src={avatarUrl} alt={name} />
          </Header>
          <Content>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>
              {forkCount > 0 && forkCount}
              {forkCount > 0 && " Forks of this repository"}
            </p>
          </Content>
          <Extra>
            {stargazers.totalCount > 0 && <h3>Stargazers:</h3>}
            {stargazers.totalCount > 0 && (
              <ul>
                {" "}
                {stargazers.nodes.map(item => (
                  <UserThumb key={item.id} {...item} />
                ))}
              </ul>
            )}
            {watchers.totalCount > 0 && <h3>Watchers:</h3>}
            {watchers.totalCount > 0 && (
              <ul>
                {" "}
                {watchers.nodes.map(item => (
                  <UserThumb key={item.id} {...item} />
                ))}
              </ul>
            )}
            <RepoDetailToggle onClick={onClick} direction={"backwards"} />
          </Extra>
        </Container>
      );
    }}
  </Query>
);

export { LARGE_REPO_QUERY, LargeRepo };
