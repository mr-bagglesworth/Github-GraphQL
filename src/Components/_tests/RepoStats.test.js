import React from "react";

// repo stats component tests
import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { REPO_STATS_QUERY, RepoStats } from "../RepoStats.js";

const wait = require("waait");

// show the request and result
// - compare input and expected
const mocks = [
  {
    request: {
      query: REPO_STATS_QUERY,
      variables: {
        login: "mr-bagglesworth"
      }
    },
    result: {
      data: {
        user: {
          repositories: {
            totalCount: 21,
            edges: [
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: true } }
            ]
          },
          repositoriesContributedTo: { totalCount: 26 }
        }
      }
    }
  }
];

// rendered state
it("render RepoStats component using REPO_STATS_QUERY,  without error", () => {
  create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RepoStats login="mr-bagglesworth" />
    </MockedProvider>
  );
});

// loading
it("RepoStats component without mocks returns loading state", () => {
  const loadingComponent = create(
    <MockedProvider mocks={[]}>
      <RepoStats />
    </MockedProvider>
  );

  // use tree.children if searching child elements
  const tree = loadingComponent.toJSON();
  expect(tree).toContain("Loading user's statistics...");
});

// error message
it("RepoStats should show error message", async () => {
  const failMock = [
    {
      request: {
        query: REPO_STATS_QUERY,
        variables: {
          login: "mr-bagglesworth"
        }
      },
      error: new Error("error messsage")
    }
  ];

  const component = create(
    <MockedProvider mocks={failMock} addTypename={false}>
      <RepoStats login="mr-bagglesworth" />
    </MockedProvider>
  );

  // wait for response
  await wait(0);

  const tree = component.toJSON();
  expect(tree).toContain("Statistics not found");
});

// success message
// it("RepoStats should shows wrapping div and stats from mocked request", async () => {
//   const component = create(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <RepoStats login="mr-bagglesworth" />
//     </MockedProvider>
//   );

//   // wait for response
//   await wait(0);

//   const tree = component.toJSON();
//   const results = {
//     a:
//       "<div>20 repositories authored, 1 repositories forked, and 26 repositories contributed to<div>"
//   };
//   expect(tree).toContain(
//     "<div>20 repositories authored, 1 repositories forked, and 26 repositories contributed to<div>".toJSON()
//   );
// });
