export default {
  get: jest.fn().mockResolvedValue({
    items: [
      {
        login: 'username'
      }
    ]
  })
  // post: jest.fn((url) => {
  //   if (url === '/something') {
  //       return Promise.resolve({
  //           data: 'data'
  //       });
  //   }
  //   if (url === '/something2') {
  //       return Promise.resolve({
  //           data: 'data2'
  //       });
  //   }
// }),
  // post: jest.fn(() => Promise.resolve({}))
};
