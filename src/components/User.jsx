/* eslint-disable no-console */

import React from 'react';
// import Style from '../stylesheets/components/Main.scss';
// import Style from '../App.scss';
import Style from '../stylesheets/components/User.scss';

const User = (props) => {
  return (
    <>
    <div className={Style.user} onClick={() => props.onUserClick(props.username)}>
      <span className={Style.avatar_wrapper}>
        <img className={Style.avatar} src={props.avatarUrl} />
      </span>
      <span className={Style.user_username}>{props.username}</span>
      <span className={Style.user_name}>{props.name}</span>
      <span className={Style.user_location}>{props.location}</span>
      <span className={Style.user_updated_at}>{props.updatedAt}</span>
    </div>
    </>
  );
};

export default User;
