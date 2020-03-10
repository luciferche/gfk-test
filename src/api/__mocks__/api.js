/**
 * Simplest tester for api service
 * Since axios calls are wrrapped there I
 * wanted to be able to test them separately
 *
 */
const oneUser = {
  username: 'luciferche',
  avatarUrl: 'https://avatars0.githubusercontent.com/u/94150?v=4',
  location: 'London',
  name: 'Luka',
  updatedAt: '2020-03-9T06:27:30Z',
  id: 'MDQ6VXNlcjk0MTUw'
};

const oneUserListResponse = {
  users: [
    {
      ...oneUser
    }
  ],
  cursorLast: null,
  hasMore: false
};

const manyUsersResponse = (() => {
  const users = [];
  for (let i = 0; i < 6; i++) {
    users.push({
      username: 'luka ' + i,
      avatarUrl: '',
      location: 'City ' + i,
      name: 'MyName ' + 1,
      updatedAt: '2020-03-9T06:27:30Z',
      cursor: i,
      id: i
    });
  }
  return {
    users: users,
    cursorLast: 1,
    hasMore: true

  };
})();

const emptyObject = {
  users: [],
  cursorLast: null,
  hasMore: true
};
export default {

  getUsersByName: jest
    .fn()
    .mockImplementation(async (username, fromCursor) => {
      if (!username) {
        throw new Error('Must provide username');
      }
      if (username === 'luciferche') {
        return oneUserListResponse;
      }
      const result = {hasMore: true, cursorLast: 1, users: manyUsersResponse.users.slice(0, 2)};

      if (fromCursor) {
        if (fromCursor === 1) {
          return {
            cursorLast: 3,
            hasMore: false,
            users: manyUsersResponse.users.slice(2, 4)
          };
        }
        return emptyObject;

      }
      return result;

    })
};

