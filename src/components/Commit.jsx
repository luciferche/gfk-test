import React from 'react';
// import Style from '../App.scss';
import Style from '../stylesheets/Commit.scss';

const Commit = (props) => {
  return (
    <>
      <li className={Style.commit}>
        <span className={Style.commit_date}>{props.commit.occurredAt}</span>
        <span className={Style.commit_icon}>
            Icon
        </span>
        <span className={Style.commit_message}>{props.commit.message}</span>
        <span className={Style.commit_repo}>{props.commit.repository}</span>
        <span className={Style.commit_count}># commits: {props.commit.commitCount}</span>
      </li>
    </>
  );
};

export default Commit;
