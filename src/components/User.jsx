
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
        <img className={Style.avatar} src={this.props.user.avatar_url}/>
        <span className={Style.user_label}>{this.props.user.login}</span>
        <span className={Style.avatar_wrapper}> <span className={Style.user_info}>{this.props.user.html_url}</span></span>
      </div>
      </>
    );
  }
}

export default User;
