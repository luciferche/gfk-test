/* eslint-disable no-ternary */
/* eslint-disable no-console */
import React, {Component} from 'react';
import Commit from '../commit/Commit';
import Style from './CommitsModal.scss';
import ShowMoreButton from '../showMoreButton/ShowMoreButton';
import api from '../../api/api';
import EmptyList from '../emptyList/EmptyList';

const pageLength = 50;

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

  getLastElementIndex(shownCommits, allCommits) {
    var lastElementIndex = pageLength + shownCommits.length;
    if (lastElementIndex > allCommits.length) {
      lastElementIndex = allCommits.length;
    }
    return lastElementIndex;
  }

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
      //display error to the user
      console.log('errrrrrrr', err);
      this.setState(() => ({
        isLoading: false
      }));
    }

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

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }
  render() {
    document.body.style.overflow = 'hidden';
    // if (!this.state.allFetchedCommits) {
    //   return null;
    // }
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
