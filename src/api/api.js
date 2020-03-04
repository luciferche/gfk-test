/* eslint-disable no-console */
import axios from 'axios';
const GITHUB_URL = 'https://api.github.com/search/users?q=';

const wrappedApi = axios.create({
  baseURL: GITHUB_URL
});

const makeRequest = (name) => {
  const url = name + 'repos:%3E42+followers:%3E1000';
  console.log('url ', url);
  return url;
};

const fetchUsers = async (name) => {
  const Response = await wrappedApi.get(makeRequest(name));
  const JSON = await Response.data;
  return JSON;
};

// export default axios.create({
//   baseURL: GITHUB_URL
// });
export default {
  getUsersByName: fetchUsers
};
