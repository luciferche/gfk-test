/* eslint-disable no-console */
import React from 'react';
import Style from './App.scss';
import api from './api/api';
import Modal from './components/Modal';
import User from './components/User';

const pageLength = 10;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      userToSearch: '',
      isModalOpen: false,
      commitsToShow: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setCommitsToShow = this.setCommitsToShow.bind(this);
    this.showMoreUsers = this.showMoreUsers.bind(this);

    this.headerTemplate = (
      <div className={Style.header}>
        <center /><h1 className={Style.title}>Github users search:</h1><center />
        <div className={Style.search_wrapper}>
          <input
            type="text" placeholder="Username"
            name="username" onChange={this.handleChange}
            className={Style.input_search} />
          <button className={Style.btn_search} onClick={this.handleClick}>
            SEARCH
          </button>
        </div>
      </div>
    );
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
        commits: this.state.commits.concat(this.props.commits.slice(this.state.commits.length, lastElementIndex))
      });
    }
  }

  setCommitsToShow(commits, username) {
    console.log('set from child', commits);
    this.setState({
      commitsToShow: commits,
      usernameToShow: username
    });
    console.log('STATE SET AFTER - setCommitsToShow');

  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    console.log('STATE SET AFTER - toggleModal');

  }

  handleChange(event) {
    const username = event.target.value;
    this.setState(() => ({
      userToSearch: username
    }));
    console.log('STATE SET AFTER - handleChange', this.state);

  }

  handleClick() {
    // alert('A name was submitted: ' + this.state.value);
    this.setState({isLoading: true});
    this.search();
  }

  async search() {
    if (!this.state.userToSearch) {
      return;
    }
    const users = await api.getUsersByName(this.state.userToSearch);
    this.setState(() => ({
      isLoading: true,
      users: users
    }));
    console.log('STATE SET AFTER - search');

  }

  // onUserClick() {

  // }
  // shouldComponentUpdate(nextProps, state) {
  //   return this.state.users !== state.users;
  // }

  render() {
    console.log('called render APP', this.state.users.length);
    if (!this.state.users.length) {
      return this.headerTemplate;
    }
    return (
      <>
        {this.headerTemplate}

        <Modal
          show={this.state.isModalOpen}
          commits={this.state.commitsToShow}
          username={this.state.usernameToShow}
          onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal>
        <UserList users={this.state.users} />
        {/* <div className={Style.user_list}>
          {
            this.state.users.map(user => {
              return <User user={user}
                key={user.id}
                onClick={this.onUserClick}
                toggleModal={this.toggleModal}
                setParentCommits={this.setCommitsToShow}
              />;
            })
          }
        </div> */}

      </>
    );
  }

  //called when component is mounted - fetching data from github
  async componentDidMount() {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log('app mounted');
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    this.setState({isLoading: true});

    const users = await api.getUsersByName('luciferche');
    this.setState(() => ({
      ...this.state,
      isLoading: false,
      users: users.slice(0, pageLength)
    }));
    console.log('STATE SET AFTER - await in didmount', this.state.users);
  }
}

//helper component for rendering list of users from props
class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: props.users.slice(0, pageLength)
    };

  }

  render() {
    return (
      <div className={Style.user_list}>
        {
          this.props.users.map(user => {
            return <User user={user}
              key={user.id}
              onClick={this.props.onUserClick}
              toggleModal={this.props.toggleModal}
              setParentCommits={this.props.setCommitsToShow}
            />;
          })
        }
      </div>
    );
  }

}

export default App;
