import React from "react";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

// utils
import { dateFormat } from "../utils/utils";

// create username query
const USER_QUERY = gql`
  query UsernameQuery($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      createdAt
      email
      followers(first: 100) {
        totalCount
        nodes {
          name
          url
        }
      }
      following(first: 100) {
        totalCount
        nodes {
          name
          url
        }
      }
      login
      name
      pinnedRepositories(first: 100) {
        totalCount
        edges {
          node {
            name
            url
            description
          }
        }
      }
      repositories(first: 100) {
        totalCount
        edges {
          node {
            name
            url
            description
          }
        }
      }
      url
      websiteUrl
    }
  }
`;

const UserDetails = ({ login }) => (
  <Query query={USER_QUERY} variables={{ login }}>
    {({ loading, error, data }) => {
      // return loading and error first
      if (loading)
        return <div className="container">Loading user details...</div>;
      if (error) return <div className="container">Username not found</div>;

      // console.log(data);
      const {
        avatarUrl,
        bio,
        createdAt,
        email,
        login,
        name,
        url,
        websiteUrl,
        followers,
        following,
        repositories,
        pinnedRepositories
      } = data.user;

      return (
        <div className="container">
          <div>
            <img src={avatarUrl} alt={name} />
          </div>
          <ul>
            <li>
              <h2>
                <a href={url}>{name}</a>
              </h2>
              <p>- {login}</p>
            </li>
            {bio && <li>{bio}</li>}
            <li>Created account on: {dateFormat(createdAt)}</li>
            {(followers.totalCount > 0 || following.totalCount > 0) && (
              <li>
                {followers.totalCount > 0 &&
                  `${followers.totalCount} followers`}
                {following.totalCount > 0 &&
                  ` ${following.totalCount} following`}
              </li>
            )}
            {(repositories.totalCount > 0 ||
              pinnedRepositories.totalCount > 0) && (
              <li>
                {repositories.totalCount > 0 &&
                  `${repositories.totalCount} repositories`}
                {pinnedRepositories.totalCount > 0 &&
                  ` ${pinnedRepositories.totalCount} pinned repositories`}
              </li>
            )}
            {email && <li>Contact this user on: {email}</li>}
            {websiteUrl && (
              <li>
                <a href={websiteUrl}>User's personal website</a>
              </li>
            )}
            <li>
              <a href={url}>Link to Profile ></a>
            </li>
          </ul>
        </div>
      );
    }}
  </Query>
);

// export default UserDetails;
export { USER_QUERY, UserDetails };
