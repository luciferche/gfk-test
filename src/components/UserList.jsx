/* eslint-disable no-console */

import React from 'react';
import ShowMoreButton from './ShowMoreButton';
import Style from '../App.scss';
import User from './User';
import api from '../api/api';

// const pageLength = 10;
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
    // this.onShowMore = this.onShowMore.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.users !== this.props.users) {
  //     console.log('POKEMONS state has changed.');
  //     this.setState(() => {
  //       return {
  //         users: this.props.users.slice(0, this.props.pageLength),
  //         showMore: this.props.users.length > this.props.pageLength
  //       };
  //     });
  //   }
  // }

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
    console.log(TAG + 'ON SHOW MORE #### - state set', this.state);
  }

  componentDidUpdate(prevProps) {
    console.log('component did update', this.props);
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
    console.log('STATE IN FETCH USERS', this.state);
    const result = await api.getUsersByName(this.props.username, cursorLast);
    this.setState((prevState) => ({
      users: [...prevState.users, ...result.users],
      showLoadMore: result.hasMore,
      cursorLast: result.cursorLast
    }));
  }

  render() {

    // useEffect((state, props) => {

    // });
    // console.log(TAG + ' RENDER - list to show size', this.state.username);
    var showMoreButton;
    //if username isn't passed to the component render empty list
    if (!this.props.username) {
      return (
        <EmptyList title="No username entered"/>
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
const EmptyList = (props) => {
  // console.log('EMPTY LIST ', props);
  return (
    <div className={Style.empty_list}>
      <h3 className={Style.empty_list_text}>{props.title}</h3>
    </div>
  );
};

export default UserList;
