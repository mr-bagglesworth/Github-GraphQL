// show more user details
import React from "react";

// GraphQL
import { Query } from "react-apollo";
import gql from "graphql-tag";

// utils
// import { dateFormat } from "../utils/utils";

// components
import UserThumb from "./UserThumb";

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
        <section className="user-extra">
          {followers.totalCount > 0 && <h3>Followers:</h3>}
          {followers.totalCount > 0 && (
            <ul>
              {" "}
              {followers.nodes.map(item => (
                <UserThumb key={item.id} {...item} />
              ))}
            </ul>
          )}
          {following.totalCount > 0 && <h3>Following:</h3>}
          {following.totalCount > 0 && (
            <ul>
              {" "}
              {following.nodes.map(item => (
                <UserThumb key={item.id} {...item} />
              ))}
            </ul>
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
        </section>
      );
    }}
  </Query>
);

export { LARGE_USER_QUERY, LargeUser };
