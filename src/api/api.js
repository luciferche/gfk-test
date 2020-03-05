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

const sortByDateDesc = (a, b) => {
  const dateA = new Date(a.occurredAt);
  const dateB = new Date(b.occurredAt);
  return dateB - dateA;
};

const parseResponse = (data) => {
  if (data.errors) {
    // eslint-disable-next-line guard-for-in
    for (const err in data.errors) {
      console.error('error ', err);
    }
    throw new Error('error fetching user commits');
  }
  if (!data || !data.data || !data.data.user) {
    console.log('empty users array', data);
    return [];
  }
  console.log('USER', data.data.user);

  if (!data.data.user.contributionsCollection.commitContributionsByRepository.length) {
    console.log('empty contributions array');
    return [];
  }

  const commits = data.data.user
    .contributionsCollection
    .commitContributionsByRepository
    .flatMap(commitsByRepo => {
      let repoName = '';
      if (commitsByRepo.repository) {
        repoName = commitsByRepo.repository.nameWithOwner;
      }
      const flatted = commitsByRepo.contributions.nodes.map(node => {
        return {
          repository: repoName,
          ...node
        };
      });
      // console.log('contributionflatted', flatted);
      return flatted;
    });

  const sorted = commits.sort(sortByDateDesc);
  return sorted;
};

const getUserData = async (userLogin) => {
  if (!userLogin) {
    //username not passed to the component
    return [];

  }
  const query = graph.getOneUserQuery(userLogin);
  // try {
  const response = await wrappedApi.post('',
    {
      query: query,
      variables: {userLogin}
    },
    {headers: authorization}
  );
  const parsed = parseResponse(response.data);

  // console.log('COMMITS', parsed);
  return parsed;
  // } catch (error) {
  //   console.error('EROR', error);
  // }
  // return [];

};
const fetchUsers = async (name) => {
  const query = graph.searchUsersQuery(name);
  console.log('QUERY ', query);
  const Response = await wrappedApi.post('',
    {
      query: query,
      variables: {name}
    },
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
  getUserData: getUserData
};

