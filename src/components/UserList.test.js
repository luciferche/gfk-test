/* eslint-disable no-console */
import React from 'react';
import ReactDOM, {render, unmountComponentAtNode} from 'react-dom';
// import {act, unmountComponentAtNode} from 'react-dom';
import {act, shallow} from 'react-dom/test-utils';
import EmptyList from './EmptyList';
import UserList from './UserList';
import User from './User';
import {create, findByType} from 'react-test-renderer';
// import Enzyme, {shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

jest.mock('../api/api');
// import Style from '../stylesheets/components/User.scss';

// import {cleanup, fireEvent} from '@testing-library/react';

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

/**
 * testing rendering list for non username in props
 *
 */
/**
 * testing rendering list for non username in props
 *
 */
it('Show empty list if no username passed', () => {
  // const testRenderer = create(<UserList />);
  // const instance = testRenderer.getInstance();
  act(() => {
    ReactDOM.render(<UserList />, container);
  });
  expect(container.instance().props.username).toBe(undefined);
  // expect(findByType(EmptyList)).toBeTruthy();

});

it('One User component for one user returned', async () => {

  // const testRenderer = await create(<UserList username='luciferche'/>);
  // const instance = testRenderer.getInstance();

  // expect(instance.props.username).toBe('luciferche');
  // expect(testRenderer.findByType(EmptyList)).toBeTruthy();

  // Use the asynchronous version of act to apply resolved promises`
  // const testInstance = await renderer.create(<UserList username="luciferche"/>).root;

  // expect(testInstance.findByType(User)).toBeTruthy();

  // expect(testInstance.findByType(User)).toBeTruthy();

  await act(async () => {
    const con = await render(<UserList username="luciferche" />, container);
    console.log('container type', container.root);
    expect(container.querySelector('[data-testid="userList"]')).toBeTruhty();
    // const cc2 = container.find('User').length;
    // console.log('user', cc2);
  });
  // eslint-disable-next-line no-console
  // expect(container
  //   .querySelector('[data-testid="commitItem"]').innerHTML)
  //   .toEqual('');

});
// it('Show empty list if no username passed', () => {
//   act(() => {
//     render(<ShowMoreButton />, container);
//   });
// });

// const emptyList = renderer.create(
//   <EmptyList title="No username entered" />,
// );
// act(() => {
//   render(<UserList />, container);
// });
// // console.log('container', container);
// expect(container).toEqual(emptyList);
// eslint-disable-next-line no-console
// expect(container
//   .querySelector('[data-testid="emptyList"]')).to
//   .toEqual('');
