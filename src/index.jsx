import {hot} from 'react-hot-loader/root';
import React from 'react';
import {render} from 'react-dom';
import App from './App';
import api from './api/api';

const HotApp = hot(App);

export const mount = async function () {
  const users = await api.getUsersByName();
  render(
    <HotApp JSON={users}/>,
    document.getElementById('root')
  );
};

mount();

