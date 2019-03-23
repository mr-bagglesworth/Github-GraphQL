import React from "react";

import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { LARGE_USER_QUERY, LargeUser } from "../LargeUser.js";

const wait = require("waait");

const mocks = [
  {
    request: {
      query: LARGE_USER_QUERY,
      variables: {
        login: "mr-bagglesworth"
      }
    },
    result: {
      data: {
        user: {
          followers: {
            totalCount: 7,
            nodes: [
              {
                avatarUrl:
                  "https://avatars1.githubusercontent.com/u/41472850?v=4",
                id: "23849tgv3e",
                login: "saksiva",
                name: "Sak",
                url: "https://github.com/saksiva"
              }
            ]
          },
          following: { totalCount: 0 },
          url: "https://github.com/mr-bagglesworth",
          websiteUrl: ""
        }
      }
    }
  }
];

// rendered state
it("render LargeUser component using LARGE_USER_QUERY, without error", () => {
  create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LargeUser login="mr-bagglesworth" />
    </MockedProvider>
  );
});

// loading
it("LargeUser component without mocks returns loading state", () => {
  const loadingComponent = create(
    <MockedProvider mocks={[]}>
      <LargeUser />
    </MockedProvider>
  );

  // use tree.children if searching child elements
  const tree = loadingComponent.toJSON();
  expect(tree).toContain("Loading extra details...");
});

// error
it("LargeUser should show error message", async () => {
  const failMock = [
    {
      request: {
        query: LARGE_USER_QUERY,
        variables: {
          login: "mr-bagglesworth"
        }
      },
      error: new Error("error messsage")
    }
  ];

  const component = create(
    <MockedProvider mocks={failMock} addTypename={false}>
      <LargeUser login="mr-bagglesworth" />
    </MockedProvider>
  );

  // wait for response
  await wait(0);

  const tree = component.toJSON();
  expect(tree).toContain("Extra details not found");
});
