import React from "react";
import { SmallText } from "./styles/containers";

const LoginText = props => {
  const { loginStatus } = props;
  return (
    <SmallText loginStatus={loginStatus}>
      <p>
        Github GraphQL API requires a personal access token to authenticate
        queries, which cannot be stored on the Github Pages host securely. Your
        login will generate a temporary access token, which will be stored only
        in your browser. Find out more about Github GraphQL API below:
      </p>
      <p>
        <a
          href="https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql"
          rel="noopener"
        >
          Authenticating with GraphQL
        </a>
        <a
          href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line"
          rel="noopener"
        >
          Github Personal Access Token
        </a>
      </p>
    </SmallText>
  );
};

export default LoginText;
