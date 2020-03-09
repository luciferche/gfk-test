/* eslint-disable no-console */

import React from 'react';
import Style from './HeaderSearch.scss';
// import Style from '../../stylesheets/Main.scss';

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
    console.log('this.username', this.state.username);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (this.state.value.length > 2) { // don't search if there are no more than 2 characters entered
        e.preventDefault();
        //enter clicked, do the search
        this.props.onClick(this.state.value);
      }
    }
  }

  handleChange(event) {
    const username = event.target.value;
    this.setState(() => ({
      value: username
    }));

  }

  render() {
    return (
      <header className={Style.header}>
        <h1 className={Style.title}>Github users search:</h1>
        <div className={Style.search_wrapper}>
          <input
            type="text"
            name="username"
            placeholder="Search Github by Username"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={() => {
              this.value = this.value;
            }} //hack for setting cursor to the end of input
            value={this.state.username}
            className={Style.input_search} />
          <button className={Style.btn_search} onClick={() => this.props.onClick(this.state.value)}>
            Search
          </button>
        </div>
      </header>
    );
  }
}

export default HeaderSearch;