/* eslint-disable no-console */
import React from 'react';
import UserList from './UserList';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShowMoreButton from '../showMoreButton/ShowMoreButton';
import EmptyList from '../emptyList/EmptyList';

jest.mock('../../api/api');

Enzyme.configure({adapter: new Adapter()});

describe('User List component', () => {
  test('renders', () => {
    const wrapper = shallow(<UserList />);

    expect(wrapper.exists()).toBe(true);
  });

  test('empty props renders empty list', async () => {
    const wrapper = await mount(<UserList username='' />);
    console.log('PPPPP - ', wrapper.find(EmptyList));
    expect(wrapper.find(EmptyList).length).toBe(1);
    wrapper.unmount();
  });

  test('When has shortUsername return many users with paging', async () => {
    const wrapper = await mount(<UserList username='lu' />);
    const instance = wrapper.instance();
    wrapper.update();
    expect(wrapper.state('users')).toHaveLength(2);
    expect(wrapper.state('showLoadMore')).toBe(true);
    expect(wrapper.state('cursorLast')).toBe(1);
    expect(wrapper.find(ShowMoreButton).length).toBe(1);
    // spy on the instance instead of the component
    const spy = jest.spyOn(instance, 'onShowMore');
    await instance.onShowMore();
    expect(instance.onShowMore).toHaveBeenCalled();

    wrapper.update();
    expect(wrapper.state('users')).toHaveLength(4);

    expect(wrapper.state('cursorLast')).toBe(3);
    expect(wrapper.find(ShowMoreButton).length).toBe(0);

    wrapper.unmount();
  });
});
