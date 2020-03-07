/* eslint-disable no-console */

import ShowMoreButton from './components/ShowMoreButton';
import Style from './App.scss';
import User from './components/User';
import React from 'react';
// const pageLength = 10;

//helper component for rendering list of users from props
class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: props.users.slice(0, this.props.pageLength),
      showMore: props.users.length > this.props.pageLength
      // onShowMore: props.onLoadMore
    };
    this.onShowMore = this.onShowMore.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      console.log('POKEMONS state has changed.');
      this.setState(() => {
        return {
          users: this.props.users.slice(0, this.props.pageLength),
          showMore: this.props.users.length > this.props.pageLength
        };
      });
    }
  }
  onShowMore() {
    if (this.state.users.length >= this.props.users.length) {
      this.setState({
        showMore: false
      });
    } else {
      var lastElementIndex = this.props.pageLength + this.state.users.length;
      if (lastElementIndex > this.props.users.length) {
        lastElementIndex = this.props.users.length;
      }
      this.setState((prevState, props) => {
        return {
          showMore: lastElementIndex < props.users.length,
          users: [...prevState.users, ...props.users.slice(prevState.users.length, lastElementIndex)]
        };
      });
    }
  }
  render() {
    console.log('USER LIST RENDER - list to show size', this.state.users.length);
    var showMoreButton;
    if (this.state.showMore) {
      showMoreButton = (<ShowMoreButton onClick={this.onShowMore}/>);
    } else {
      showMoreButton = null;
    }
    return (
      <div className={Style.user_list}>
        {
          this.state.users.map(user => {
            return <User user={user}
              key={user.id}
              onUserClick={this.props.onUserClick}
              toggleModal={this.props.toggleModal}
              /*setParentCommits={this.props.setParentCommits}*/
              getUserCommits={this.props.getUserCommits}
            />;
          })
        }
        {
          showMoreButton
        }
      </div>
    );
  }

}

export default UserList;
