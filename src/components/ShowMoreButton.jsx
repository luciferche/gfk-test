import Style from '../stylesheets/components/Main.scss';
import React from 'react';

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

