/* eslint-disable no-debugger */
/* eslint-disable no-console */
import axios from 'axios';
import graph from './graph';

// const GITHUB_URL = 'https://api.github.com/search'; //OLD API
const githubUrl = 'https://api.github.com/graphql'; //new graphql api

// const githubToken = 'c10fa511a578e764a20ad3722ddd2ba273405ed8';
const githubToken = '565c75dbd633ba7d8980604d1d55ed1d6105996d';

// The Authorization in the header of the request
const authorization = {Authorization: 'bearer ' + githubToken};

const wrappedApi = axios.create({
  baseURL: githubUrl
});

const getUserData = async (userId) => {
  const query = graph.getOneUserQuery(userId);

  return await wrappedApi.post('',
    {query: query},
    {headers: authorization}
  );
};
const fetchUsers = async (name) => {
  if (!name) {
    return [];
  }
  const query = graph.searchUsersQuery(name);
  const Response = await wrappedApi.post('',
    {query: query},
    {headers: authorization}
  );
  const JSON = await Response.data;
  console.log('users ', JSON);
  if (JSON.errors) {
    console.error('error with request ', JSON.errors);
    return [];
  }
  if (!JSON.data.search.edges.length) {
    console.error('nothing found');
    return [];
  }
  const parsedResponse = JSON.data.search.edges.map(node => {
    var localDate = new Date(node.node.updatedAt);

    return {
      avatarUrl: node.node.avatarUrl,
      username: node.node.login,
      id: node.node.id,
      updatedAt: localDate.toLocaleString()
    };
  });
  console.log('response from GRAPHQL', parsedResponse);

  return parsedResponse;
};

// export default axios.create({
//   baseURL: GITHUB_URL
// });
export default {
  getUsersByName: fetchUsers,
  getUserById: getUserData
};
