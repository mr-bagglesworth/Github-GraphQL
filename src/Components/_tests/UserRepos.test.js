import React from "react";

// unit test, as with UserDetails.js
import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { USER_REPOS_QUERY, UserRepos } from "../UserRepos.js";

const wait = require("waait");

const mocks = [
  {
    request: {
      query: USER_REPOS_QUERY,
      variables: {
        login: "mr-bagglesworth"
      }
    },
    result: {
      data: {
        user: {
          repositories: {
            totalCount: 21
          },
          repositoriesContributedTo: {
            totalCount: 26
          }
        }
      }
    }
  }
];

// rendered state
it("render UserRepos component using USER_REPOS_QUERY, without error", () => {
  create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserRepos login="mr-bagglesworth" />
    </MockedProvider>
  );
});

// loading
it("UserRepos component without mocks returns loading state", () => {
  const loadingComponent = create(
    <MockedProvider mocks={[]}>
      <UserRepos />
    </MockedProvider>
  );

  // use tree.children if searching for child components
  const tree = loadingComponent.toJSON();
  expect(tree).toContain("Loading user's repositories...");
});

// error
it("UserRepos should show error message", async () => {
  const failMock = [
    {
      request: {
        query: USER_REPOS_QUERY,
        variables: {
          login: "mr-bagglesworth"
        }
      },
      error: new Error("error messsage")
    }
  ];

  const component = create(
    <MockedProvider mocks={failMock} addTypename={false}>
      <UserRepos login="mr-bagglesworth" />
    </MockedProvider>
  );

  // wait for response
  await wait(0);

  const tree = component.toJSON();
  expect(tree).toContain("Username not found");
});
