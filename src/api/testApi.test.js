import mockAxios from 'axios';
import api from './api';

it('fetches users from github', async () => {
  const emptyResult = {
    users: [],
    hasMore: false,
    cursor: null
  };
  // setup
  mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: emptyResult
    })
  );

  // work
  const result = await api.getUsersByName('luciferche');

  // expect
  expect(result).toEqual(emptyResult);
  // expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // expect(mockAxios.get).toHaveBeenCalledWith(
  //   'https://api.unsplash.com/search/photos',
  //   {
  //     params: {
  //       client_id: process.env.REACT_APP_UNSPLASH_TOKEN,
  //       query: 'cats'
  //     }
  //   }
  // );
});
