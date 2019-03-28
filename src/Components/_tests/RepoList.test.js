import React from "react";

// repo list component tests
// - 2 queries for authored and contributed repos
import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import {
  REPOS_AUTHORED_QUERY,
  REPOS_CONTRIBUTED_QUERY,
  RepoList
} from "../RepoComponents/RepoList.js";

const wait = require("waait");

const authoredMocks = [
  {
    request: {
      query: REPOS_AUTHORED_QUERY,
      variables: {
        login: "saksiva"
      }
    },
    result: {
      data: {
        user: {
          repositories: {
            totalCount: 13,
            edges: [
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: false } },
              { node: { isFork: true } },
              { node: { isFork: true } },
              { node: { isFork: true } },
              { node: { isFork: true } },
              { node: { isFork: true } }
            ]
          }
        }
      }
    }
  }
];

const contributedMocks = [
  {
    request: {
      query: REPOS_CONTRIBUTED_QUERY,
      variables: {
        login: "saksiva"
      }
    },
    result: {
      data: {
        user: {
          repositories: {
            totalCount: 23,
            edges: [{ node: { isFork: false } }]
          }
        }
      }
    }
  }
];

// rendered state
it("render RepoList component using REPOS_AUTHORED_QUERY, without error", () => {
  create(
    <MockedProvider mocks={authoredMocks} addTypename={false}>
      <RepoList login="mr-bagglesworth" search={"authored"} />
    </MockedProvider>
  );
});
it("render RepoList component using REPOS_CONTRIBUTED_QUERY, without error", () => {
  create(
    <MockedProvider mocks={contributedMocks} addTypename={false}>
      <RepoList login="mr-bagglesworth" search={"contributed"} />
    </MockedProvider>
  );
});

// error message
it("RepoList should show error message with no results", async () => {
  const failMock = [
    {
      request: {
        query: REPOS_CONTRIBUTED_QUERY,
        variables: {
          login: "saksiva"
        }
      },
      error: new Error("error messsage")
    }
  ];

  const component = create(
    <MockedProvider mocks={failMock} addTypename={false}>
      <RepoList login="mr-bagglesworth" search={"contributed"} />
    </MockedProvider>
  );

  // wait for response
  await wait(0);

  const tree = component.toJSON();
  expect(tree).toContain("Repositories not found");
});
