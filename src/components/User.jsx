/* eslint-disable no-console */

import React from 'react';
import Style from '../App.scss';
import api from '../api/api';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commits: []
    };

  }
  // this.setState({...this.state, isLoading: true});
  click(event) {
    console.log('EVENT', event);
    event.preventDefault();
    this.userClicked();
  }
  async userClicked() {
    console.log('userclicked', this.props.user.username);

    // if (this.state.commits.length) {
    //   console.log('present commits in state already');
    //   return;
    // }
    const fetchedCommits = await api.getUserData(this.props.user.username);
    this.setState((prevState) => {
      const commits = prevState.commits.concat(fetchedCommits);

      return {
        commits: commits
      };
    });
  }
  render() {
    return (
      <>
      <div className={Style.user} onClick={async () => {
        await this.userClicked()
        ;
      }}>
        <span className={Style.avatar_wrapper}>
          <img className={Style.avatar} src={this.props.user.avatarUrl} />
        </span>
        <span className={Style.user_label}>{this.props.user.username}</span>
        <span className={Style.user_location}>{this.props.user.location}</span>
        <span className={Style.user_updated_at}>{this.props.user.updatedAt}</span>
      </div>
      </>
    );
  }
}

export default User;
