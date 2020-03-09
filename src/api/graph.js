/* eslint-disable no-console */

/**
 * Generates user search query that returns basic user info for
 * all users that match the param
 * @param {name to be searched against username} name
 */
export const searchUsersQuery = `query GetUserByName($name: String!, $fromCursor: String) {
    search(query: $name, type: USER, first: 10, after: $fromCursor) {
      userCount
      edges {
        cursor
        node {
          __typename
            ... on User {
              login
              avatarUrl
              location
              name
              updatedAt
              id
            }
        }
      }
    }
  }`;

export const userActivityQuery = `query getUserActivity($userLogin: String!, $fromCursor: String) {
  user(login: $userLogin) {
    contributionsCollection {
      commitContributionsByRepository {
        contributions(first: 100, orderBy: {field: OCCURRED_AT, direction: DESC}, after: $fromCursor) {
          pageInfo {
            hasNextPage
            endCursor
            startCursor
          }
          totalCount
          edges {
            node {
              commitCount
              occurredAt
              repository {
                nameWithOwner
              }
            }
          }
        }
      }
    }
  }
}`;
/*
const getOneUserQuery = () => {

  const query = `query GetOneUserQuery($userLogin: String!) {
    user(login: $userLogin) {
      contributionsCollection {
        commitContributionsByRepository {
          contributions(orderBy: {field: OCCURRED_AT, direction: DESC}, first: 10) {
            nodes {
              commitCount
              occurredAt
            }
          }
          repository {
            nameWithOwner
          }
        }
      }
    }
  }`;
  return query;

};
*/
// export default {
//   searchUsersQuery: searchUsersQuery,
//   userActivityQuery: userActivityQuery
// };
