import React from "react";

// if a click event occurs, trigger LargeUser.js
import { LargeUser } from "./LargeUser";
import UserToggle from "./UserToggle";

// GraphQL
// - pairs a query with a component
import { Query } from "react-apollo";
import gql from "graphql-tag";

// utils
import { dateFormat, abbrev } from "../../utils/utils";

// styles
import { Container, Header, Content, Button, Extra } from "../styles/headerContainer";

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

      const { avatarUrl, bio, createdAt, login, name, url, followers, following } = data.user;

      return (
        <Container>
          <Header className="user-header">
            <img src={avatarUrl} alt={name} />
          </Header>
          <Content>
            <h2>
              <a href={url}>{login}</a>
            </h2>
            {name && <p>a.k.a. {name}</p>}
            {bio && <p>{!expanded ? abbrev(bio, 90) : bio}</p>}
            <p>Created account on: {dateFormat(createdAt)}</p>
            {(followers.totalCount > 0 || following.totalCount > 0) && (
              <p>
                {followers.totalCount > 0 && `${followers.totalCount} followers`}
                {following.totalCount > 0 && ` ${following.totalCount} following`}
              </p>
            )}
            <Button>
              <UserToggle onClick={btnClick} expanded={expanded} />
            </Button>
          </Content>
          {expanded && (
            <Extra>
              <LargeUser login={login} />
            </Extra>
          )}
        </Container>
      );
    }}
  </Query>
);

export { SMALL_USER_QUERY, SmallUser };
