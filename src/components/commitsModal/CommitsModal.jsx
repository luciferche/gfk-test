import React, {Component} from 'react';
import Commit from '../commit/Commit';
import Style from './CommitsModal.scss';
import ShowMoreButton from '../showMoreButton/ShowMoreButton';
import api from '../../api/api';
import EmptyList from '../emptyList/EmptyList';

const pageLength = 50;

/**
 * Componet CommitsModal holds actual view and commits list for a user
 * accepts as props a username
 * and fetches commits for that user
 * Commits returned are limited to 50 per one load to the state
 * after every press onn shor more button, additional 50 are added to the list
 */
class CommitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      commits: [],
      isLoading: true
    };
    this.loadMoreCommits = this.loadMoreCommits.bind(this);
  }

  /* helper function for returning last element for slicing full array ) */
  getLastElementIndex(shownCommits, allCommits) {
    var lastElementIndex = pageLength + shownCommits.length;
    if (lastElementIndex > allCommits.length) {
      lastElementIndex = allCommits.length;
    }
    return lastElementIndex;
  }

  /**
   * Async function for calling api and loading all commits for username
   *
   */
  async getUserCommits() {

    try {
      const commits = await api.getUserData(this.props.username);

      this.setState((prevState) => {
        var lastElementIndex = this.getLastElementIndex(prevState.commits, commits);
        return {
          allFetchedCommits: commits,
          showMore: lastElementIndex < commits.length,
          commits: [...prevState.commits, ...commits.slice(prevState.commits.length, lastElementIndex)],
          isModalOpen: !prevState.isModalOpen,
          isLoading: false
        };
      });
    } catch (err) {
      //to-do display error to the user
      this.setState(() => ({
        isLoading: false
      }));
    }

  }

  /**
   * Functionn for copying elements from full list to the list for rendering in DOM
   */
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

  /**
   * Once component mounts I try fetching all commits by user
   * */
  async componentDidMount() {
    this.getUserCommits();
  }

  //hack to returnn overlay to the document body once modal is closed
  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }
  render() {
    document.body.style.overflow = 'hidden'; //hack to remove overlay from document body
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
          <Activity
            commits={this.state.commits}
            isLoading={this.state.isLoading}
            loadMoreCommits={this.loadMoreCommits}
            showMore={this.state.showMore} />
        </div>
      </div>
      </>
    );
  }
}

/**
 * Helper functional component for presenting empty list
 * or list of commits along with buttons, depending on props
 * @param {props from the parent} props
 */
const Activity = (props) => {
  if (props.isLoading) {
    return <EmptyList title="Loading..."/>;
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
            return <Commit commit={commit} key={commit.id}/>;
          })
        }</div>
      {
        showMoreButton
      }
    </React.Fragment>
  );

};
export default CommitsModal;
