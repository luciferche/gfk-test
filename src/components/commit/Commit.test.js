import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import Commit from './Commit';

let container = null;
const sampleCommit = {
  occurredAt: '',
  message: 'luciferche',
  repository: 'repo',
  commitCount: 2
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

it('Shows Empty list div when no props', () => {
  act(() => {
    render(<Commit />, container);
  });
  // eslint-disable-next-line no-console
  expect(container
    .querySelector('[data-testid="commitItem"]').innerHTML)
    .toEqual('');
});

it('Shows Commit with data from commit', () => {
  act(() => {
    render(<Commit commit={sampleCommit} key={32}/>, container);
  });
  const repo = container
    .querySelector('[data-testid="repository"]').textContent;
  const occurredAt = container
    .querySelector('[data-testid="occurredAt"]').textContent;
  const commitCount = container
    .querySelector('[data-testid="commitCount"]').textContent;

  expect(repo)
    .toEqual('repo');
  expect(occurredAt)
    .toEqual('');
  expect(commitCount)
    .toEqual('commits # 2');
});
