/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

import React from 'react';
import Style from '../App.scss';
/**
 * Helper class for holding view with input box for username
 * and a button to search
 * button on click calls function passed to it by it's parent
 * and passes it's state.username to it
 * So parent can do the search independently
 */
class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      username: props.username
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      //enter clicked, do the search
      console.log('handleEnter', this.state);
      this.props.onClick(this.state.value);
    }
  }

  handleChange(event) {
    const username = event.target.value;
    console.log('handlechange', username);
    this.setState(() => ({
      value: username
    }));

  }

  render() {
    return (
      <div className={Style.header}>
        <center /><h1 className={Style.title}>Github users search:</h1><center />
        <div className={Style.search_wrapper}>
          <input
            type="text" placeholder="Username"
            name="username"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus="this.value = this.value;" //hack for setting cursor to the end of input
            value={this.state.username}
            className={Style.input_search} />
          <button className={Style.btn_search} onClick={() => this.props.onClick(this.state.value)}>
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}

export default HeaderSearch;
