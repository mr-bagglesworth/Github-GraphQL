import React from "react";

// if a click event occurs, trigger LargeUser.js
import { LargeUser } from "./LargeUser";
import UserToggle from "./UserToggle";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

// utils
import { dateFormat } from "../utils/utils";

// styles
import { User } from "./styles/containers";

// create username query
// - make this more basic
const SMALL_USER_QUERY = gql`
  query UsernameQuery($login: String!) {
    user(login: $login) {
      avatarUrl
      bio
      createdAt
      followers(first: 100) {
        totalCount
      }
      following(first: 100) {
        totalCount
      }
      login
      name
      url
    }
  }
`;

const SmallUser = ({ login, expanded, btnClick }) => (
  <Query query={SMALL_USER_QUERY} variables={{ login }}>
    {({ loading, error, data }) => {
      // return loading and error first
      if (loading) return <>Loading user details...</>;
      if (error) return <>Username not found</>;

      const {
        avatarUrl,
        bio,
        createdAt,
        login,
        name,
        url,
        followers,
        following
      } = data.user;

      // pick out nicer values here...
      // description component
      // - can be a util, requires a prop
      // - cut off after x number of characters (32) (+40rem)

      return (
        <User>
          <header className="user-header">
            <img src={avatarUrl} alt={name} />
          </header>
          <section className="user-content">
            <h2>
              <a href={url}>{login}</a>
            </h2>
            {name && <p>a.k.a. {name}</p>}
            {bio && <p>{bio}</p>}
            <p>Created account on: {dateFormat(createdAt)}</p>
            {(followers.totalCount > 0 || following.totalCount > 0) && (
              <p>
                {followers.totalCount > 0 &&
                  `${followers.totalCount} followers`}
                {following.totalCount > 0 &&
                  ` ${following.totalCount} following`}
              </p>
            )}
            <div className="user-button">
              <UserToggle onClick={btnClick} expanded={expanded} />
            </div>
          </section>
          {expanded && <LargeUser login={login} />}
        </User>
      );
    }}
  </Query>
);

export { SMALL_USER_QUERY, SmallUser };
