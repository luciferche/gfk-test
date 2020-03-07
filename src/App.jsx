/* eslint-disable no-console */
import React from 'react';
import api from './api/api';
import Modal from './components/Modal';
import UserList from './components/UserList';
import HeaderSearch from './components/HeaderSearch';

const TAG = '!!!!! APP !!!!!  ';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // users: [],
      isLoading: false,
      userToSearch: '',
      isModalOpen: false,
      commitsToShow: []
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getUserCommits = this.getUserCommits.bind(this);
    // this.showMoreUsers = this.showMoreUsers.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    // console.log(TAG + 'STATE SET AFTER - toggleModal');

  }

  handleSearchClick(username) {
    // console.log('esearch by', username);
    // this.setState({isLoading: true});
    this.search(username);
  }
  /*
  async search(username) {
    if (!username) {
      console.error(TAG + 'username provided falsy');
      return;
    }
    const users = await api.getUsersByName(username);
    this.setState(() => ({
      isLoading: true,
      users: users
    }));
    console.log(TAG + 'STATE SET AFTER - search', this.state);
  }
*/
  search(username) {
    if (!username) {
      console.error(TAG + 'username provided falsy');
      return;
    }
    this.setState(() => {
      return {
        username: username
      };
    });
    console.log(TAG + 'STATE SET AFTER - search', this.state);

  }

  async getUserCommits(username) {
    // console.log(TAG + 'set from child', username);

    const fetchedCommits = await api.getUserData(username);
    this.setState((prevState) => {
      return {
        commitsToShow: fetchedCommits,
        isModalOpen: !prevState.isModalOpen,
        usernameToShow: username
      };
    });

    // console.log(TAG, 'STATE SET AFTER - getUserCommits', this.state);

  }
  onUserClick(username) {
    this.getUserCommits(username);
    // this.togg
  }

  render() {
    console.log(TAG, 'called render APP', this.state.username);
    return (
      <>
        <HeaderSearch onClick={this.handleSearchClick}/>

        <Modal
          show={this.state.isModalOpen}
          commits={this.state.commitsToShow}
          username={this.state.usernameToShow}
          onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
        <UserList getUserCommits={this.getUserCommits}
          username={this.state.username}
          onUserClick={this.onUserClick}
          toggleModal={this.toggleModal}/>

      </>
    );
  }

  //called when component is mounted - fetching data from github
  async componentDidMount() {
    // console.log(TAG + ' mounted');
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    // this.setState({isLoading: true});

    // const users = await api.getUsersByName('luciferche');
    // this.setState(() => ({
    //   ...this.state,
    //   isLoading: false,
    //   users: users
    // }));
  }
}

export default App;
