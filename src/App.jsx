import React from 'react';
import Style from './App.scss';

const App = (props) => {

  return (
    <>
      {
        props.JSON.items.map(user => {
          return <div className={Style.something}>{user.login}</div>;
        })
      }
    </>
  );
};

export default App;
