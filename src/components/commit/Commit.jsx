import React from 'react';
import Style from './Commit.scss';

/**
 * Commit functional component used for presenting one commit line returned by the server
 * It should be extended with pullRequestContributionns and issueCOntributions ideally
 * And in case of several types of activity I intended to have different icon for each of them
 */
const Commit = (props) => {
  if (!props.commit) {
    return (<>
        <div className={Style.commit} data-testid='commitItem'/>
      </>
    );
  }
  return (
    <>
      <div className={Style.commit} data-testid='commitItem'>
        <span className={Style.commit_date} data-testid='occurredAt'>{props.commit.occurredAt}</span>
        {/* <span className={Style.commit_icon}>
            Icon
        </span>
        <span className={Style.commit_message} data-testid='message'>{props.commit.message}</span> */}
        <span className={Style.commit_repo} data-testid='repository'>{props.commit.repository}</span>
        <span className={Style.commit_count} data-testid='commitCount'>commits # {props.commit.commitCount}</span>
      </div>
    </>
  );
};

export default Commit;
