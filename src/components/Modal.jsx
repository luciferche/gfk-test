/* eslint-disable no-console */
import React from 'react';
import CommitsModal from './CommitsModal';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    };
    // this.commits = this.props.commits;
  }
  render() {
    console.log('this.props on modal render', this.props);
    // console.log('this.props on modal STATE', this.state);
    if (!this.props.show) {
      return <React.Fragment/>;
    }
    // The gray background

    return <CommitsModal
      show={this.props.show}
      username={this.props.username}
      onClose={this.props.onClose}>
    Here's some content for the modal
    </CommitsModal>;
    // return <CommitsModal commits={this.props.commits} onClose={this.props.onClose}/>;
  }
}

export default Modal;
