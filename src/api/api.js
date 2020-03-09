/* eslint-disable no-console */
import axios from 'axios';
import {searchUsersQuery, userActivityQuery} from './graph';

// const GITHUB_URL = 'https://api.github.com/search'; //OLD API
const githubUrl = 'https://api.github.com/graphql'; //new graphql api

const githubToken = '565c75dbd633ba7d8980604d1d55ed1d6105996d';

// The Authorization in the header of the request
const authorization = {Authorization: 'bearer ' + githubToken};

// const wrappedApi = axios.create({
//   baseURL: githubUrl
// });

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
  // console.log('USER', data.data.user);

  if (!data.data.user.contributionsCollection.commitContributionsByRepository.length) {
    console.log('empty contributions array');
    return [];
  }
  const commits = data.data.user
    .contributionsCollection
    .commitContributionsByRepository
    .flatMap(commitsByRepo => {
      const flatted = commitsByRepo.contributions.edges.flatMap(node => {
        return {
          ...node.node,
          repository: node.node.repository.nameWithOwner
        };
      });
      return flatted;
    })
    .map((commit, index) => {
      var localDate = new Date(commit.occurredAt);
      return {
        ...commit,
        occurredAt: localDate.toLocaleString(),
        date: localDate.toDateString,
        time: localDate.toLocaleTimeString,
        id: index + 1
      };
    });

  console.log('commit - ', commits);

  const sorted = commits.sort(sortByDateDesc);
  return sorted;
};

const getUserData = async (userLogin) => {
  if (!userLogin) {
    //username not passed to the component
    return [];

  }
  // const query = graph.getOneUserQuery(userLogin);
  console.log('@@@@@@ GET USER DATA CALLED');
  // try {
  // const response = await wrappedApi.post('',
  const response = await axios.post(githubUrl,
    {
      query: userActivityQuery,
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

/**
 *  Gets users from Github by username and offset cursor
 * @param {username to search by} name
 * @param {from cursor of the last user to start searching from} from
 * @returns { object containing users, cursor to the last user and flag if there are more users for that query}
 * {
 *  users: Array,
 *  cursorLast: String,
 *  hasMore: boolean
 * }
 */
const fetchUsers = async (name, from) => {
  const fromCursor = from || null;
  const result = {
    users: [],
    cursorLast: null,
    hasMore: false
  };
  console.log('FROM CURSOR', fromCursor);
  // const query = graph.searchUsersQuery(name, fromCursor);

  const Response = await axios.post(githubUrl,
    {
      query: searchUsersQuery,
      variables: {name, fromCursor}
    },
    {headers: authorization}
  );
  const JSON = await Response.data;
  if (JSON.errors) {
    console.error('error with request ', JSON.errors);
    return result;
  }
  if (!JSON.data.search.edges.length) {
    console.error('nothing found');
    return result;
  }
  const lastUser = JSON.data.search.edges[JSON.data.search.edges.length - 1];
  console.log('lastUser', lastUser);
  const parsedResponse = JSON.data.search.edges.map(node => {
    var localDate = new Date(node.node.updatedAt);

    return {
      avatarUrl: node.node.avatarUrl,
      username: node.node.login,
      name: node.node.name,
      id: node.node.id,
      updatedAt: localDate.toLocaleString(),
      cursor: node.cursor
    };
  });
  console.log('LAST ELEMENT FROM GRAPHQL', parsedResponse[parsedResponse.length - 1]);
  result.users = parsedResponse;
  if (parsedResponse.length < JSON.data.search.userCount) {
    result.hasMore = true;
    result.cursorLast = parsedResponse[parsedResponse.length - 1].cursor;
  }
  return result;
};

// export default axios.create({
//   baseURL: GITHUB_URL
// });
export default {
  getUsersByName: fetchUsers,
  getUserData: getUserData
};

