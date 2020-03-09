import {template} from '@babel/core';

const oneUser = {
  login: 'luciferche',
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
      login: 'luka ' + i,
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
// const resultListMany = {
//   users: [
//     {
//       login: 'luk',
//       avatarUrl: 'https://avatars0.githubusercontent.com/u/94150?v=4',
//       location: 'London',
//       name: 'Luk',
//       updatedAt: '2020-03-9T06:27:30Z',
//       id: '1',
//       cursor: '1'
//     },
//     {
//       login: 'luka',
//       avatarUrl: '',
//       location: '',
//       name: 'Luka matovic',
//       updatedAt: '2020-03-9T06:27:30Z',
//       id: '2',
//       cursor: '2'
//     },
//     {
//       login: 'lukaa',
//       avatarUrl: '',
//       location: 'London',
//       name: 'Luka adfsadf',
//       updatedAt: '2020-03-9T06:27:30Z',
//       id: '3',
//       cursor: '3'
//     }
//   ],
//   cursorLast: 2,
//   hasMore: true
// };
const emptyObject = {
  users: [],
  cursorLast: null,
  hasMore: true
};
export default {

  getUsersByName: jest
    .fn()
    .mockImplementation((username, fromCursor) => {
      if (!username) {
        return emptyObject;
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

