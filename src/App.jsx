/* eslint-disable no-console */
import React from 'react';
// import Style from './App.scss';
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
  }
  handleChange(event) {
    this.setState(...this.state, {
      userToSearch: event.target.userToSearch
    });
  }

  handleClick() {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.setState({...this.state, isLoading: true});
    this.search();
  }

  async search() {
    console.log('IMPLEMENT SEARCH', this.state.userToSearch);
    if (!this.state.userToSearch) {
      return;
    }
    const users = await api.getUsersByName(this.state.userToSearch);
    this.setState({
      ...this.state, ...{
        isLoading: false,
        users
      }
    });
  }

  render() {
    if (!this.state.users.length) {
      return (
        <div className="main_header_wrapper">
          <h1 className="main_title">Github users search:</h1>
          <input type="text" name="username" placeholder="Username" />
          <button className="square" onClick={() => this.search()}>
            SEARCH
          </button>
        </div>
      );
    }
    return (
      <>
        <div className="main_header_wrapper">
          <h1 className="main_title">Github users search:</h1>
          <input type="text" name="username" placeholder="Username" />
          <button className="square" onClick={() => this.search()}>
            SEARCH
          </button>
        </div>

        <hr/>

        {

          this.state.users.map(user => {
            return <User user={user} />;
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
    this.setState({
      ...this.state, ...{
        isLoading: false,
        users
      }
    });
  }
}

export default App;
