import React from "react";

// unit test the component, I guess
// - data comes from state in actual component

// with a bit of help from here:
// https://blog.apollographql.com/testing-apollos-query-component-d575dc642e04
// addTypename - graphql expects a type, set to false as default
import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { USER_QUERY, UserDetails } from "../UserDetails.js";

const wait = require("waait");

const mocks = [
  {
    request: {
      query: USER_QUERY,
      variables: {
        login: "mr-bagglesworth"
      }
    },
    result: {
      data: {
        user: {
          avatarUrl: "https://avatars0.githubusercontent.com/u/28146666?v=4",
          bio: "",
          createdAt: "2017-04-28T12:44:24Z",
          login: "mr-bagglesworth",
          name: "Mr Bagglesworth",
          pinnedRepositories: {
            totalCount: 4
          },
          repositories: { totalCount: 21 },
          url: "https://github.com/mr-bagglesworth",
          websiteUrl: ""
        }
      }
    }
  }
];

// rendered state
it("render UserDetails component using USER_QUERY, without error", () => {
  create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserDetails login="mr-bagglesworth" />
    </MockedProvider>
  );
});

// loading
it("UserDetails component without mocks returns loading state", () => {
  const loadingComponent = create(
    <MockedProvider mocks={[]}>
      <UserDetails />
    </MockedProvider>
  );

  // use tree.children if searching child elements
  const tree = loadingComponent.toJSON();
  expect(tree).toContain("Loading user details...");
});

// final state
// it("UserDetails component async test", async () => {
//   const finalComponent = create(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <UserDetails login="mr-bagglesworth" />
//     </MockedProvider>
//   );

//   await wait(0); // wait for response

//   // can't get root on unmounted test renderer
//   const p = finalComponent.root.findByType("p");
//   expect(p.children).toContain("mr-bagglesworth");
// });

it("UserDetails should show error message", async () => {
  const failMock = [
    {
      request: {
        query: USER_QUERY,
        variables: {
          login: "mr-bagglesworth"
        }
      },
      error: new Error("error messsage")
    }
  ];

  const component = create(
    <MockedProvider mocks={failMock} addTypename={false}>
      <UserDetails login="mr-bagglesworth" />
    </MockedProvider>
  );

  // wait for response
  await wait(0);

  const tree = component.toJSON();
  expect(tree).toContain("Username not found");
});
