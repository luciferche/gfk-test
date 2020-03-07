/* eslint-disable no-console */
import React from 'react';
import api from './api/api';
import Modal from './components/Modal';

import HeaderSearch from './components/HeaderSearch';

const pageLength = 10;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      userToSearch: '',
      isModalOpen: false,
      commitsToShow: [],
      totalCount: null,
      lastUserShownIndex: null,
      fistUserShownIndex: null
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getUserCommits = this.getUserCommits.bind(this);
    this.showMoreUsers = this.showMoreUsers.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
  }

  showMoreUsers() {
    if (this.state.commits.length >= this.props.commits.length) {
      this.setState({
        showMore: false
      });
    } else {
      var lastElementIndex = pageLength + this.state.commits.length;
      if (lastElementIndex > this.props.commits.length) {
        lastElementIndex = this.props.commits.length;
      }
      this.setState({
        showMore: lastElementIndex < this.props.commits.length,
        commits: [...this.state.commits, ...this.props.commits.slice(this.state.commits.length, lastElementIndex)]
      });
    }
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    console.log('STATE SET AFTER - toggleModal');

  }

  handleSearchClick(username) {
    console.log('esearch by', username);
    // this.setState({isLoading: true});
    this.search(username);
  }

  async search(username) {
    if (!username) {
      console.error('username provided falsy');
      return;
    }
    const users = await api.getUsersByName(username);
    this.setState(() => ({
      isLoading: true,
      users: users
    }));
    console.log('STATE SET AFTER - search', this.state);
  }

  async getUserCommits(username) {
    console.log('set from child', username);

    const fetchedCommits = await api.getUserData(username);
    this.setState((prevState) => {
      return {
        commitsToShow: fetchedCommits,
        isModalOpen: !prevState.isModalOpen,
        usernameToShow: username
      };
    });

    console.log('STATE SET AFTER - getUserCommits', this.state);

  }
  onUserClick(username) {
    this.getUserCommits(username);
    // this.togg
  }

  render() {
    console.log('called render APP', this.state.users.length);
    if (!this.state.users.length) {
      return (
        <HeaderSearch onClick={this.handleSearchClick}/>

      );
    }
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
        <UserList users={this.state.users} getUserCommits={this.getUserCommits}
          pageLength={this.pageLength}
          onUserClick={this.onUserClick}
          toggleModal={this.toggleModal}/>

      </>
    );
  }

  //called when component is mounted - fetching data from github
  async componentDidMount() {
    // eslint-disable-next-line no-debugger
    // debugger;
    console.log('app mounted');
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    this.setState({isLoading: true});

    const users = await api.getUsersByName('luciferche');
    this.setState(() => ({
      ...this.state,
      isLoading: false,
      users: users
    }));
  }
}

export default App;
