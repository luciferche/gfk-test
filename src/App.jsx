import React from 'react';
import Modal from './components/modal/Modal';
import UserList from './components/userList/UserList';
import HeaderSearch from './components/headerSearch/HeaderSearch';
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

  /* Helper function for toggling modal open /close */
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  /**
   * Function called on search button cick and passed down to the
   * {@HeaderSearch component
   *  Username passed to this function only changes the state of
   * itself - {@UserList component reacts to that change
   * @param {username to be used against search} username
   */
  search(username) {
    if (!username) {
      // console.error(
      //   'username provided falsy');
      //to-do add feedback to the user
      return;
    }
    this.setState(() => {
      return {
        username: username
      };
    });
  }

  getUserCommits(username) {

    this.setState((prevState) => {
      return {
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
          onUserClick={this.getUserCommits}/>

      </>
    );
  }

}

export default App;
