import React from "react";

import { create } from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import { CONTRIBUTIONS_QUERY, RepoContributions } from "../RepoComponents/RepoContributions.js";

const wait = require("waait");

const mocks = [
  {
    request: {
      query: CONTRIBUTIONS_QUERY,
      variables: {
        login: "mr-bagglesworth",
        updatedAt: "2019-04-08T01:15:57Z"
      }
    },
    result: {
      data: {
        user: {
          contributionsCollection: {
            commitContributionsByRepository: [
              {
                contributions: {
                  totalCount: 116,
                  nodes: []
                },
                repository: {
                  id: "MDEwOlJlcG9zaXRvcnkxNzQ2MzIzNjI=",
                  isFork: false,
                  name: "Github-GraphQL"
                }
              },
              {
                contributions: {
                  totalCount: 71,
                  nodes: []
                },
                repository: {
                  id: "MDEwOlJlcG9zaXRvcnkxNjQ0NjExNDM=",
                  isFork: false,
                  name: "FAC-TRACK"
                }
              }
            ]
          }
        }
      }
    }
  }
];

// empty contributions array
// const mockNoContrib = [
//   {
//     request: {
//       query: CONTRIBUTIONS_QUERY,
//       variables: {
//         login: "mr-bagglesworth",
//         updatedAt: "2019-04-08T01:15:57Z"
//       }
//     },
//     result: {
//       data: {
//         user: {
//           contributionsCollection: {
//             commitContributionsByRepository: []
//           }
//         }
//       }
//     }
//   }
// ];

// rendered state
it("render RepoContributions component using CONTRIBUTIONS_QUERY, without error", () => {
  create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RepoContributions owner="mr-bagglesworth" name="Github-GraphQL" />
    </MockedProvider>
  );
});

// loading
it("RepoContributions component without mocks returns loading state", () => {
  const loadingComponent = create(
    <MockedProvider mocks={[]}>
      <RepoContributions />
    </MockedProvider>
  );

  const tree = loadingComponent.toJSON();
  expect(tree).toContain("Loading contributions...");
});

// error
it("RepoContributions should show error message", async () => {
  const failMock = [
    {
      request: {
        query: CONTRIBUTIONS_QUERY,
        variables: {
          login: "mr-bagglesworth",
          updatedAt: "2019-04-08T01:15:57Z"
        }
      },
      error: new Error("error messsage")
    }
  ];

  const component = create(
    <MockedProvider mocks={failMock} addTypename={false}>
      <RepoContributions login="mr-bagglesworth" />
    </MockedProvider>
  );

  // wait for response
  await wait(0);

  const tree = component.toJSON();
  expect(tree).toContain("Contribution details not found");
});

// - - - - - - - - - - - - - -
// test the content, based on:
// 1. contributions array length
// 2. forked repo
// 3. undefined find match
// it("render RepoContributions component where user has not contributed anything to the repo in question", () => {
//   const noContribComponent = create(
//     <MockedProvider mocks={mockNoContrib} addTypename={false}>
//       <RepoContributions owner="mr-bagglesworth" name="Github-GraphQL" />
//     </MockedProvider>
//   );

//   const tree = noContribComponent.toJSON();
//   expect(tree).toContain("No User Contributions");
// });
