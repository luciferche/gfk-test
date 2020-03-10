import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act, isDOMComponent} from 'react-dom/test-utils';

import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});
import User from './User';

let container = null;
const sampleUser = {
  username: 'luk',
  avatarUrl: 'https://avatars0.githubusercontent.com/u/94150?v=4',
  location: 'London',
  name: 'Luk',
  updatedAt: 'sometimes',
  id: '1',
  cursor: '1'
};

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render elemet without prrops', () => {
  act(() => {
    render(<User />, container);
  });
  // eslint-disable-next-line no-console
  expect(container
    .querySelector('[data-testid="userItem"]').innerHTML)
    .toEqual('');
});

it('Shows User component loaded with data from sample user', () => {

  act(() => {
    render(<User
      {...sampleUser}
      key={1}
    />, container);
  });

  const avatarWrapper = container
    .querySelector('[data-testid="avatarWrapper"]');

  const innerImg = avatarWrapper.querySelector('img');
  expect(avatarWrapper).toBeTruthy();

  expect(isDOMComponent(innerImg)).toBe(true);
  const username = container
    .querySelector('[data-testid="username"]').textContent;
  const avatar = container
    .querySelector('[data-testid="avatar"]');
  const location = container
    .querySelector('[data-testid="location"]').textContent;
  const updated = container
    .querySelector('[data-testid="updated"]').textContent;
  const name = container
    .querySelector('[data-testid="name"]').textContent;

  expect(username).toBe(sampleUser.username);
  expect(avatar.getAttribute('src')).toEqual(sampleUser.avatarUrl);
  expect(location).toBe(sampleUser.location);
  expect(updated).toBe(sampleUser.updatedAt);
  expect(name).toBe(sampleUser.name);

});
