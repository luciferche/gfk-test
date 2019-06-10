import {hot} from 'react-hot-loader/root';
import React from 'react';
import {render} from 'react-dom';
import App from './App';

const HotApp = hot(App);

export const mount = function () {
  fetch('https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000')
    .then(Response => Response.json())
    .then(JSON => {
      render(
        <HotApp JSON={JSON}/>,
        document.getElementById('root')
      );
    });
};

mount();

