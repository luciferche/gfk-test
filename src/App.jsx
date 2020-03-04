/* eslint-disable no-console */
import React from 'react';
import Style from './App.scss';
import User from './components/User';
import api from './api/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      userToSearch: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.headerTemplate = (
      <div className={Style.header}>
        <h1 className={Style.title}>Github users search:</h1>
        <input type="text" name="username" placeholder="Username" />
        <button className={Style.btn_search} onClick={this.handleClick}>
          SEARCH
        </button>
      </div>
    );
  }
  handleChange(event) {
    const username = event.target.value;
    this.setState(() => ({
      userToSearch: username
    }));
  }

  handleClick() {
    // alert('A name was submitted: ' + this.state.value);
    this.setState({isLoading: true});
    this.search();
  }

  async search() {
    console.log('IMPLEMENT SEARCH', this.state.userToSearch);
    if (!this.state.userToSearch) {
      return;
    }
    const users = await api.getUsersByName(this.state.userToSearch);
    this.setState(() => ({
      isLoading: true,
      users: users
    }));

  }

  render() {
    if (!this.state.users.length) {
      return this.headerTemplate;
    }
    return (
      <>
        {this.headerTemplate}
        <hr/>

        {

          this.state.users.map(user => {
            return <User user={user} key={user.id}/>;
          })
        }
      </>
    );
  }

  //called when component is mounted - fetching data from github
  async componentDidMount() {
    // Load async data.
    // Update state with new data.
    // Re-render our component.
    this.setState({...this.state, isLoading: true});

    const users = await api.getUsersByName('luciferche');
    this.setState(() => ({
      isLoading: false,
      users
    }));
  }
}

export default App;
