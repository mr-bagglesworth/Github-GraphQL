import React from "react";

// with a bit of help from here:
// https://blog.apollographql.com/testing-apollos-query-component-d575dc642e04
import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { USER_QUERY, UserDetails } from "./UserDetails.js";

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

it("renders without error", () => {
  create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserDetails login="mr-bagglesworth" />
    </MockedProvider>
  );
});
