
import React from 'react';
import Style from '../App.scss';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };

  }
  render() {
    return (
      <>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{this.props.user.login}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{this.props.user.email}</h6>
          <p class="card-text">Catch phrase and commits:</p>
        </div>
      </div>
      <div className={Style.something}> {this.props.user.login}</div>
      </>
    );
  }
}

export default User;
