/* eslint-disable no-console */
import axios from 'axios';
const GITHUB_URL = 'https://api.github.com/search';

const wrappedApi = axios.create({
  baseURL: GITHUB_URL
});

const makeRequest = (name) => {
  const url = 'users?q=' + name + '+repos:%3E42+followers:%3E1000';
  console.log('url ', url);
  return url;
};

const fetchUsers = async (name) => {
  if (!name) {
    return [];
  }
  const Response = await wrappedApi.get(makeRequest(name));
  const JSON = await Response.data;
  console.log('users ', JSON);
  return JSON.items;
};

// export default axios.create({
//   baseURL: GITHUB_URL
// });
export default {
  getUsersByName: fetchUsers
};
