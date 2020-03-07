/* eslint-disable no-console */
import React from 'react';
import ShowMoreButton from './ShowMoreButton';
import Style from '../App.scss';
import User from './User';
import api from '../api/api';
import EmptyList from './EmptyList';

const TAG = '@@@@@ User List @@@@@  ';

//helper component for rendering list of users from props
class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showLoadMore: false,
      cursorLast: null
    };
  }

  /**
   * Async function called on button click to load more users
   */
  async onShowMore() {
    console.log('on show more click STATE', this.state.cursorLast);
    const result = await api.getUsersByName(this.props.username, this.state.cursorLast);

    if (!result.users.length) {
      console.log(TAG + ' Vusers on SHOW MORE EMPTY');
    }
    const lastUser = result.users[result.users.length];
    console.log(TAG + 'last User', lastUser);
    this.setState((prevState) => ({
      users: [...prevState.users, ...result.users],
      showLoadMore: result.hasMore,
      cursorLast: result.cursorLast
    }));
  }

  /**
   * Overriding function that gets called on every update of the properties of the component
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
      console.log(TAG + 'component did update', this.state);
      this.fetchUsers(null);
    }
  }

  async fetchUsers(cursorLast) {
    // console.log('STATE IN FETCH USERS', this.state);
    const result = await api.getUsersByName(this.props.username, cursorLast);
    this.setState((prevState) => ({
      users: [...prevState.users, ...result.users],
      showLoadMore: result.hasMore,
      cursorLast: result.cursorLast
    }));
  }

  render() {
    var showMoreButton;
    //if username isn't passed to the component render empty list
    if (!this.props.username) {
      return (
        <EmptyList title="No username entered"/>
      );
    }
    if (this.state.users.length === 0) {
      return (
        <EmptyList title="No users found"/>
      );
    }
    if (this.state.showLoadMore) {
      showMoreButton = (<ShowMoreButton onClick={async () => this.onShowMore()}/>);
    } else {
      showMoreButton = null;
    }
    return (
      <div className={Style.user_list}>
        {
          this.state.users.map(user => {
            return <User {...user }
              key={user.id}
              onUserClick={this.props.onUserClick}
              toggleModal={this.props.toggleModal}
              /*setParentCommits={this.props.setParentCommits}*/
              // getUserCommits={this.props.getUserCommits}
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
    // console.log('luka created list', this.props);

    // console.log(TAG + 'mountedw with props', this.props);
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    // this.setState({isLoading: true});
    if (!this.props.username) {
      return;
    }
    this.fetchUsers(null);
  }
}

export default UserList;
