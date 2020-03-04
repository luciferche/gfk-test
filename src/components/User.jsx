
import React from 'react';
import Style from '../App.scss';

class User extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   user: props.user
    // };

  }
  render() {
    return (
      <>
      <div className={Style.user}>
        <span className={Style.avatar_wrapper}>
          <img className={Style.avatar} src={this.props.user.avatarUrl} />
        </span>
        <span className={Style.user_label}>{this.props.user.username}</span>
        <span className={Style.user_location}>{this.props.user.location}</span>
        <span className={Style.updatedAt}>{this.props.user.updatedAt}</span>
      </div>
      </>
    );
  }
}

export default User;
