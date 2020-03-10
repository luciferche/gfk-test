import React from 'react';
import Style from './UserList.scss';
import ShowMoreButton from '../showMoreButton/ShowMoreButton';

import User from '../user/User';
import api from '../../api/api';
import EmptyList from '../emptyList/EmptyList';

//helper component for rendering list of users from props
class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showLoadMore: false,
      cursorLast: null,
      isLoading: false
    };
  }

  /**
   * Async function called on button click to load more users
   */
  async onShowMore() {
    const result = await api.getUsersByName(this.props.username, this.state.cursorLast);

    this.setState((prevState) => ({
      users: [...prevState.users, ...result.users],
      showLoadMore: result.hasMore,
      cursorLast: result.cursorLast
    }));
  }

  /**
   * Overriding function that gets called on after every update of the properties of the component
   * If there waas a change in the username that this list needs to fetch new list
   * changes state and calls #fetchUsers
   * @param {previous properties that the component held} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      this.setState(() => {
        return {
          users: [],
          showLoadMore: false,
          cursorLast: null
        };
      });
      this.fetchUsers(null);
    }

  }

  /**
   * Async function for calling api with
   * passing username from props and cursor of the last element
   * in the current user list. if null, it will fetch first 50
   * @param {cursor from which to query on} cursorLast
   */
  async fetchUsers(cursorLast) {

    this.setState(() => {
      return {isLoading: true};
    });
    try {
      const result = await api.getUsersByName(this.props.username, cursorLast);
      this.setState((prevState) => ({
        users: [...prevState.users, ...result.users],
        showLoadMore: result.hasMore,
        cursorLast: result.cursorLast,
        isLoading: false
      }));
    } catch (err) {
      //show error to the user somehow
      this.setState(() => {
        return {
          isLoading:false
        };
      });
    }

  }

  render() {
    //if it is loading, show it to user
    if (this.state.isLoading) {
      return (
        <EmptyList title="Loading...."/>
      );
    }
    //if username isn't passed to the component render empty list
    if (!this.props.username) {
      return (
        <EmptyList title="No username entered"/>
      );
    }
    // obviously no users found
    if (this.state.users && this.state.users.length === 0) {
      return (
        <EmptyList title="No users found"/>
      );
    }
    var showMoreButton;
    if (this.state.showLoadMore) {
      showMoreButton = (<ShowMoreButton onClick={async () => this.onShowMore()}/>);
    } else {
      showMoreButton = null;
    }
    return (
      <div className={Style.user_list} data-testid="userList">
        {
          this.state.users.map(user => {
            return <User {...user }
              key={user.id}
              onUserClick={this.props.onUserClick}
              toggleModal={this.props.toggleModal}
            />;
          })
        }
        {
          showMoreButton
        }
      </div>
    );
  }

  //called when component is mounted - fetching data from github
  async componentDidMount() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    if (!this.props.username) {
      return;
    }
    this.fetchUsers(null);
  }
}

export default UserList;
