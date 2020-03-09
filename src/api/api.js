/* eslint-disable no-console */
import axios from 'axios';
import {searchUsersQuery, userActivityQuery} from './graph';

// const GITHUB_URL = 'https://api.github.com/search'; //OLD API
const githubUrl = 'https://api.github.com/graphql'; //new graphql api
const githubToken = '565c75dbd633ba7d8980604d1d55ed1d6105996d';

// The Authorization in the header of the request
const authorization = {Authorization: 'bearer ' + githubToken};

const sortByDateDesc = (a, b) => {
  const dateA = new Date(a.occurredAt);
  const dateB = new Date(b.occurredAt);
  return dateB - dateA;
};

const parseResponse = (data) => {
  // try {
  if (!data.data.user.contributionsCollection.commitContributionsByRepository.length) {
    console.log('empty contributions array');
    return [];
  }
  const commits = data.data.user
    .contributionsCollection
    .commitContributionsByRepository
    .filter(commitsByRepo => {
      return commitsByRepo.contributions.edges.length > 0;
    })
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

  const sorted = commits.sort(sortByDateDesc);
  return sorted;

};

const parseUserData = (data) => {

  const result = {
    users: [],
    cursorLast: null,
    hasMore: false
  };
  if (!data || !data.data || !data.data.search) {
    return result;
  }
  if (data.errors) {
    throw Error('Error with the request', data.errors);
  }
  const searchHelp = data.data.search;
  if (!searchHelp.edges.length) {
    return result;
  }

  const edges = data.data.search.edges;
  const parsedResponse = edges.map(node => {
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
  // console.log('LAST ELEMENT FROM GRAPHQL', parsedResponse[parsedResponse.length - 1]);
  result.users = parsedResponse;
  if (parsedResponse.length < data.data.search.userCount) {
    result.hasMore = true;
    result.cursorLast = parsedResponse[parsedResponse.length - 1].cursor;
  }
  return result;
};

const getUserData = async (userLogin) => {
  if (!userLogin) {
    //username not passed to the component
    return [];

  }
  const response = await axios.post(githubUrl,
    {
      query: userActivityQuery,
      variables: {userLogin}
    },
    {headers: authorization}
  );
  if (response.errors) {
    // eslint-disable-next-line guard-for-in
    for (const err in response.errors) {
      console.error('error ', err);
    }
    throw new Error('error fetching user commits');
  }

  return parseResponse(response.data);
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
  if (!name) {
    throw Error('Must provide username');
  }
  const fromCursor = from || null;

  const Response = await axios.post(githubUrl,
    {
      query: searchUsersQuery,
      variables: {name, fromCursor}
    },
    {headers: authorization}
  );

  const JSON = await Response.data;

  if (JSON.errors) {
    // eslint-disable-next-line guard-for-in
    for (const err in JSON.errors) {
      console.error('error ', err);
    }
    throw new Error('error fetching user commits');
  }
  return parseUserData(JSON);
};

export default {
  getUsersByName: fetchUsers,
  getUserData: getUserData
};

