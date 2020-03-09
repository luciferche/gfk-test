import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import EmptyList from './EmptyList';

let container = null;

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

it('Shows Empty list without title passed', () => {
  act(() => {
    render(<EmptyList />, container);
  });

  expect(container
    .querySelector('p').textContent)
    .toBe('Nothing to show here');
});

it('Shows Empty container with title from props', () => {
  act(() => {
    render(<EmptyList title="Luka"/>, container);
  });
  expect(container
    .querySelector('p').textContent)
    .toBe('Luka');
});
