// show more user details
import React from "react";

// GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";

// components
import UserThumbList from "../UserThumbList";

// large user query
const LARGE_USER_QUERY = gql`
  query UsernameQuery($login: String!) {
    user(login: $login) {
      followers(first: 100) {
        totalCount
        nodes {
          avatarUrl(size: 80)
          id
          login
          name
          url
        }
      }
      following(first: 100) {
        totalCount
        nodes {
          avatarUrl(size: 80)
          id
          login
          name
          url
        }
      }
      url
      websiteUrl
    }
  }
`;

const LargeUser = ({ login }) => (
  <Query query={LARGE_USER_QUERY} variables={{ login }}>
    {({ loading, error, data }) => {
      // return loading and error first
      if (loading) return <>Loading extra details...</>;
      if (error) return <>Extra details not found</>;

      // just focus on following / followers, repos in order search
      const { email, url, websiteUrl, followers, following } = data.user;

      return (
        <>
          {followers.totalCount > 0 && <h3>Followers:</h3>}
          {followers.totalCount > 0 && (
            <UserThumbList thumbs={followers.nodes} />
          )}
          {following.totalCount > 0 && <h3>Following:</h3>}
          {following.totalCount > 0 && (
            <UserThumbList thumbs={following.nodes} />
          )}
          {email && <li>Contact this user on: {email}</li>}
          {websiteUrl && (
            <p>
              <a href={websiteUrl}>User's personal website</a>
            </p>
          )}
          <p>
            <a href={url}>Link to Profile ></a>
          </p>
        </>
      );
    }}
  </Query>
);

export { LARGE_USER_QUERY, LargeUser };
