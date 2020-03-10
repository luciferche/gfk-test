import api from './api';
/**
 * Simplest tester for api service
 * Since axios calls are wrrapped there I
 * wanted to be able to test my functions separately
 * mocks ./api module
 */
// jest.mock('axios');
jest.mock('./api');

it('returns empty list for no username apssed', async () => {
  await expect(api.getUsersByName()).rejects.toThrow('Must provide username');
});

it('returns list of one for a username', async () => {

  // await expect(getUsersByName('luciferche')).rejects.toMatch('Must provide username');
  const result = await api.getUsersByName('luciferche');
  expect(result.users.length).toBe(1);
  expect(result.users[0].username).toBe('luciferche');
  expect(result.cursorLast).toBe(null);
  expect(result.hasMore).toBe(false);

});
