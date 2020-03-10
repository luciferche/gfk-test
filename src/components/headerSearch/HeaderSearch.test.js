/* eslint-disable no-console */
import React from 'react';
import HeaderSearch from './HeaderSearch';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

describe('User List component', () => {
  test('renders', () => {
    const wrapper = shallow(<HeaderSearch />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

});
