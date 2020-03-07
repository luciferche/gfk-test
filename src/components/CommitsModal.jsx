/* eslint-disable no-ternary */
/* eslint-disable no-console */
import React, {Component} from 'react';
import Commit from './Commit';
import Style from '../stylesheets/Commit.scss';
import ShowMoreButton from './ShowMoreButton';
import api from '../api/api';
import EmptyList from './EmptyList';

// const pageLength = 20;

class CommitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      commits: []
    };
    // this.loadMoreCommits = this.loadMoreCommits.bind(this);
    console.log('commits modal constructor');

    console.log('STATE ON END OF CREATION', this.state);
  }

  async onShowMore() {

  }

  async getUserCommits() {
    // console.log(TAG + 'set from child', username);
    console.log('CommitsModal GET USER COMMITS', this.props);
    const commits = await api.getUserData(this.props.username);
    this.setState((prevState) => {
      return {
        commits: commits,
        isModalOpen: !prevState.isModalOpen
      };
    });

  }
  /*
  loadMoreCommits() {
    if (this.state.commits.length >= this.props.commits.length) {
      this.setState({
        showMore: false
      });
    } else {
      var lastElementIndex = pageLength + this.state.commits.length;
      if (lastElementIndex > this.props.commits.length) {
        lastElementIndex = this.props.commits.length;
      }
      this.setState((prevState, props) => {
        return {
          showMore: lastElementIndex < props.commits.length,
          commits: [...prevState.commits, ...props.commits.slice(prevState.commits.length, lastElementIndex)]
        };
      });
    }
  }
  */
  async componentDidMount() {
    this.getUserCommits();
  }

  /**
   * helper function to show Activity list
   * @param {* commits} props
   */
  /*
  Activity(props) {
    if (!props.commits.length) {
      return (
        <EmptyList title="No activities found" />
      );
    }
    var showMoreButton;
    if (props.showMore) {
      showMoreButton = (<ShowMoreButton onClick={props.loadMoreCommits}/>);
    } else {
      showMoreButton = null;
    }
    return (
      <React.Fragment>
        <div className={Style.modal_content}>

          {
            props.commits.map(commit => {
              // console.log('mapped user', commit);
              return <Commit commit={commit} key={commit.id}/>;
            })
          }</div>
        {
          showMoreButton
        }
      </React.Fragment>
    );

    //return list of items if there are some

  }
*/
  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }
  render() {
    document.body.style.overflow = 'hidden';
    if (!this.props.show) {
      return null;
    }
    return (
      <>
      <div className={Style.backdrop_style}>
        <div className={Style.modal_style} >
          <div className={Style.modal_close_wrapper}>
            <button onClick={this.props.onClose} className={Style.modal_close}>
              X
            </button>
          </div>
          <h4 className={Style.modal_title}>
            Latest activity for: {this.props.username}
          </h4>
          {/* <div className={Style.modal_list} /> */}
          <Activity
            commits={this.state.commits}
            loadMoreCommits={this.loadMoreCommits}
            showMore={this.state.showMore} />
        </div>
      </div>
      </>
    );
  }
}

const Activity = (props) => {
  if (!props.commits.length) {
    return (
      <EmptyList title="No activities found" />
    );
  }
  var showMoreButton;
  if (props.showMore) {
    showMoreButton = (<ShowMoreButton onClick={props.loadMoreCommits}/>);
  } else {
    showMoreButton = null;
  }
  return (
    <React.Fragment>
      <div className={Style.modal_content}>

        {
          props.commits.map(commit => {
            // console.log('mapped user', commit);
            return <Commit commit={commit} key={commit.id}/>;
          })
        }</div>
      {
        showMoreButton
      }
    </React.Fragment>
  );

  //return list of items if there are some

};
export default CommitsModal;
