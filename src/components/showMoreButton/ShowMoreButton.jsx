import React from 'react';
import Style from '../../stylesheets/Main.scss';

const ShowMoreButton = (props) => {
  return (
    <>
      <button className={Style.btn_load_more} onClick={props.onClick}>
        Show more
      </button>
    </>
  );
};
export default ShowMoreButton;

