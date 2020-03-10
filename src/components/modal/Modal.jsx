import React from 'react';
import CommitsModal from '../commitsModal/CommitsModal';

/**
 * Just a helper component for keeping track of the modal
 * creating it and recreating it based on the props this Modal gets
 * from parent
 */
const Modal = (props) => {
  if (!props.show) {
    return (<React.Fragment/>);
  }

  return (
    <CommitsModal
      show={props.show}
      username={props.username}
      onClose={props.onClose} />
  );
};

export default Modal;
