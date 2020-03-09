/* eslint-disable no-console */
import React from 'react';
import Modal from './components/Modal';
import UserList from './components/UserList';
import HeaderSearch from './components/HeaderSearch';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isModalOpen: false
    };

    this.search = this.search.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getUserCommits = this.getUserCommits.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  search(username) {
    if (!username) {
      console.error(
        'username provided falsy');
      return;
    }
    this.setState(() => {
      return {
        username: username
      };
    });
  }

  /* to-do check & remove async*/
  async getUserCommits(username) {

    this.setState((prevState) => {
      return {
        // commitsToShow: fetchedCommits,
        isModalOpen: !prevState.isModalOpen,
        usernameToShow: username
      };
    });

  }

  render() {
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
          onUserClick={this.getUserCommits}
          toggleModal={this.toggleModal}/>

      </>
    );
  }

}

export default App;
