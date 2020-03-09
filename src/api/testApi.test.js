// import mockAxios from 'axios';
import api from './api';
import axios from 'axios';

jest.mock('axios');

const resultListOfOne = {
  users: [
    {
      login: 'luciferche',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/94150?v=4',
      location: 'London',
      name: 'Luka',
      updatedAt: '2020-03-9T06:27:30Z',
      id: 'MDQ6VXNlcjk0MTUw'
    }
  ],
  cursorLast: null,
  hasMore: false
};

it('returns empty list for no username apssed', async () => {
  await expect(api.getUsersByName()).rejects.toThrow('Must provide username');
});

it('returns list of one for a username', async () => {
  axios.post.mockResolvedValue(resultListOfOne);
  // await expect(getUsersByName('luciferche')).rejects.toMatch('Must provide username');
  const result = await api.getUsersByName('luciferche');
  expect(result.users.length).toBe(1);
  expect(result.users[0].username).toBe('luciferche');
  expect(result.cursorLast).toBe(null);
  expect(result.hasMore).toBe(false);

});
