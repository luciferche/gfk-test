/* eslint-disable no-ternary */
/* eslint-disable no-console */
import React, {Component} from 'react';
import Commit from './Commit';
import Style from '../stylesheets/components/CommitModal.scss';
import ShowMoreButton from './ShowMoreButton';
import api from '../api/api';
import EmptyList from './EmptyList';

const pageLength = 50;

class CommitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      commits: []
    };
    this.loadMoreCommits = this.loadMoreCommits.bind(this);
    console.log('commits modal constructor');

    console.log('STATE ON END OF CREATION', this.state);
  }

  async onShowMore() {

  }

  getLastElementIndex(shownCommits, allCommits) {
    var lastElementIndex = pageLength + shownCommits.length;
    if (lastElementIndex > allCommits.length) {
      lastElementIndex = allCommits.length;
    }
    return lastElementIndex;
  }
  async getUserCommits() {

    const commits = await api.getUserData(this.props.username);

    this.setState((prevState) => {
      var lastElementIndex = this.getLastElementIndex(prevState.commits, commits);
      return {
        allFetchedCommits: commits,
        showMore: lastElementIndex < commits.length,
        commits: [...prevState.commits, ...commits.slice(prevState.commits.length, lastElementIndex)],
        isModalOpen: !prevState.isModalOpen
      };
    });

  }
  loadMoreCommits() {
    if (this.state.commits.length >= this.state.allFetchedCommits.length) {
      this.setState({
        showMore: false
      });
    } else {
      var lastElementIndex = this.getLastElementIndex(this.state.commits, this.state.allFetchedCommits);
      this.setState((prevState) => {
        return {
          showMore: lastElementIndex < prevState.allFetchedCommits.length,
          commits: prevState.commits.concat(prevState.allFetchedCommits.slice(prevState.commits.length, lastElementIndex))
        };
      });
    }
  }

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
    if (!this.state.allFetchedCommits) {
      return null;
    }
    return (
      <>
      <div className={Style.backdrop_style}>
        <div className={Style.modal_style} >
          <div className={Style.modal_header}>
            <h4 className={Style.modal_title}>
            Latest activity for: {this.props.username}
            </h4>
            <button onClick={this.props.onClose} className={Style.modal_close}>
              x
            </button>
          </div>
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
  if (!props.commits) {
    return (<></>);
  }
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
