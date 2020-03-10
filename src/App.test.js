
import HeaderSearch from './components/headerSearch/HeaderSearch';
import Modal from './components/modal/Modal';
import UserList from './components/userList/UserList';

import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter: new Adapter()});

let app = null;

/**
 * TESTING App component mounting and components
 */

beforeEach(() => {
  app = mount(<App />);

});

afterEach(() => {
  app.unmount();
});

describe('Testing App component', () => {
  it('Check if  App is properly mounted', async () => {

    expect(app.exists()).toBe(true);

    expect(app.find(HeaderSearch).length).toBe(1);
    expect(app.find(Modal).length).toBe(1);
    expect(app.find(UserList).length).toBe(1);
    expect(app.state('isLoading')).toBe(false);
    expect(app.state('isModalOpen')).toBe(false);
  });
});

