import React from "react";

import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { LARGE_REPO_QUERY, LargeRepo } from "../RepoComponents/LargeRepo.js";

const wait = require("waait");

const mocks = [
  {
    request: {
      query: LARGE_REPO_QUERY,
      variables: {
        owner: "mr-bagglesworth",
        name: "Github-GraphQL"
      }
    },
    result: {
      data: {
        repository: {
          createdAt: "2019-03-09T01:04:54Z",
          description: "An example of using Github GraphQL API with Apollo React",
          diskUsage: 1719,
          forkCount: 0,
          forks: { totalCount: 0 },
          id: "MDEwOlJlcG9zaXRvcnkxNzQ2MzIzNjI=",
          isFork: false
        }
      }
    }
  }
];

// rendered state
it("render LargeRepo component using LARGE_REPO_QUERY, without error", () => {
  create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LargeRepo owner="mr-bagglesworth" name="Github-GraphQL" />
    </MockedProvider>
  );
});

// loading
it("LargeRepo component without mocks returns loading state", () => {
  const loadingComponent = create(
    <MockedProvider mocks={[]}>
      <LargeRepo />
    </MockedProvider>
  );

  // use tree.children if searching child elements
  const tree = loadingComponent.toJSON();
  expect(tree).toContain("Loading extra repo details...");
});

// error
it("LargeRepo should show error message", async () => {
  const failMock = [
    {
      request: {
        query: LARGE_REPO_QUERY,
        variables: {
          owner: "mr-bagglesworth",
          name: "Github-GraphQL"
        }
      },
      error: new Error("error messsage")
    }
  ];

  const component = create(
    <MockedProvider mocks={failMock} addTypename={false}>
      <LargeRepo login="mr-bagglesworth" />
    </MockedProvider>
  );

  // wait for response
  await wait(0);

  const tree = component.toJSON();
  expect(tree).toContain("Extra repo details not found");
});
