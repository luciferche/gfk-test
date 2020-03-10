import React from 'react';
import Style from './User.scss';

/**
 * Component holding only props and styles for presenting one user item iwith basic information
 */
const User = (props) => {
  if (Object.keys(props).length === 0) {
    return (<>
      <div className={Style.user} data-testid='userItem' />
    </>);
  }
  return (
    <>
    <div className={Style.user} onClick={() => props.onUserClick(props.username)} data-testid='userItem'>
      <span className={Style.avatar_wrapper} data-testid='avatarWrapper'>
        <img className={Style.avatar} src={props.avatarUrl} data-testid='avatar'/>
      </span>
      <span className={Style.user_username} data-testid='username'>{props.username}</span>
      <span className={Style.user_name} data-testid='name'>{props.name}</span>
      <span className={Style.user_location} data-testid='location'>{props.location}</span>
      <span className={Style.user_updated_at} data-testid='updated'>{props.updatedAt}</span>
    </div>
    </>
  );
};

export default User;
