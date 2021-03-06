import React from 'react';
import Style from './EmptyList.scss';

/**
 * Helper function for rendering container with a message for an empty list
 * probably should rename it...
 * @param {props} props
 */
const EmptyList = (props) => {
  return (
    <div className={Style.empty_list} data-testid='emptyList'>
      <p>{props.title || 'Nothing to show here'}</p>
    </div>
  );
};

export default EmptyList;
