import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import ShowMoreButton from './ShowMoreButton';

let container = null;
// const sampleCommit = {
//   occurredAt: '',
//   message: 'luciferche',
//   repository: 'repo',
//   commitCount: 2
// };

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

it('Show buttonn without click function', () => {
  act(() => {
    render(<ShowMoreButton />, container);
  });
  // eslint-disable-next-line no-console
  // expect(container
  //   .querySelector('[data-testid="commitItem"]').innerHTML)
  //   .toEqual('');
});
