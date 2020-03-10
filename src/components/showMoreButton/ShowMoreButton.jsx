import React from 'react';
import Style from '../../stylesheets/Main.scss';

/**
 *  Show more button component used in two places so far
 *  accepts parent function as a property for the button's onClick
 * @param {props object to pass to this component
 *          - text: text to replace default button text
 *          - onClick: parent function to be called on button click } props
 */
const ShowMoreButton = (props) => {
  return (
    <>
      <button className={Style.btn_load_more} onClick={props.onClick}>
        { props.text || 'Show more' }
      </button>
    </>
  );
};
export default ShowMoreButton;

