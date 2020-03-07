import Style from '../stylesheets/Commit.scss';
import React from 'react';

const ShowMoreButton = (props) => {
  return (
<>
        <button className={Style.btn_load_more} onClick={props.onClick}>
          \\//
        </button>
        </>
  );
};
export default ShowMoreButton;

