/* eslint-disable no-console */

const searchUsersQuery = (name) => {
  // console.log('offsetnumber', offsetNumber);
  const query = `query {
    search(query: "` + name + `", type: USER, first: 100) {
      edges {
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
  console.log('QUERY', query);

  // return JSON.stringify(query);
  return query;
};

const getOneUserQuery = (userId) => {
  const query = 'node(id: "' + userId + '"'
  + '... on User {'
  + '     id'
  + '     email'
  + '}'
  + '}';
  return query;

};

export default {
  searchUsersQuery: searchUsersQuery,
  getOneUserQuery: getOneUserQuery
};
