/* eslint-disable no-console */

/**
 * Generates user search query that returns basic user info for
 * all users that match the param
 * @param {name to be searched against username} name
 */
const searchUsersQuery = () => {
  // console.log('offsetnumber', offsetNumber);
  const query = `query GetUserByName($name: String!, $fromCursor: String) {
    search(query: $name, type: USER, first: 100, from: $fromCursor) {
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
  // console.log('QUERY', query);
  return query;
};

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

export default {
  searchUsersQuery: searchUsersQuery,
  getOneUserQuery: getOneUserQuery
};
