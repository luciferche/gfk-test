/* eslint-disable no-console */
import React from 'react';
// import api from './api/api';
import Modal from './components/Modal';
import UserList from './components/UserList';
import HeaderSearch from './components/HeaderSearch';
// import Style from './App.scss';
import './App.scss';

const TAG = '!!!!! APP !!!!!  ';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // userToSearch: 'luciferche',
      isModalOpen: false
    };

    // this.handleSearchClick = this.handleSearchClick.bind(this);
    this.search = this.search.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    // this.getUserCommits = this.getUserCommits.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  // handleSearchClick(username) {
  //   // console.log('esearch by', username);
  //   // this.setState({isLoading: true});
  //   this.search(username);
  // }

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
  }

  async getUserCommits(username) {

    // const fetchedCommits = await api.getUserData(username);
    // console.log(TAG + ' fetchedCommits ', fetchedCommits);
    this.setState((prevState) => {
      return {
        // commitsToShow: fetchedCommits,
        isModalOpen: !prevState.isModalOpen,
        usernameToShow: username
      };
    });

  }
  onUserClick(username) {
    this.getUserCommits(username);
    // this.toggleModal();
  }

  render() {
    console.log(TAG, 'called render APP', this.state.username);
    return (
      <>
        <HeaderSearch onClick={this.search}/>

        <Modal
          show={this.state.isModalOpen}
          username={this.state.usernameToShow}
          onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
        <UserList
          username={this.state.username}
          onUserClick={this.onUserClick}
          toggleModal={this.toggleModal}/>

      </>
    );
  }

}

export default App;
