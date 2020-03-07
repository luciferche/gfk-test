import React from 'react';
import Style from '../stylesheets/Util.scss';
/**
 * Helper function for rendering container with a message for an empty list
 * probably should rename it...
 * @param {props} props
 */
const EmptyList = (props) => {
  return (
    <div className={Style.empty_list}>
      <h3 className={Style.empty_list_text}>{props.title}</h3>
    </div>
  );
};

export default EmptyList;
