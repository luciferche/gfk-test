/* eslint-disable no-ternary */
/* eslint-disable no-console */
import React, {Component} from 'react';
import Commit from './Commit';
import Style from '../stylesheets/Commit.scss';

// import ReactDOM from 'react-dom';
const pageLength = 20;

class CommitsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: true,
      commits: props.commits.slice(0, pageLength)
    };
    this.loadMoreCommits = this.loadMoreCommits.bind(this);
    console.log('commits modal constructor');

    console.log('STATE ON END OF CREATION', this.state);

  }

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
          commits: prevState.state.commits.concat(props.commits.slice(prevState.commits.length, lastElementIndex))
        };
      });
    }
  }
  async componentDidMount() {

  }

  /**
   * helper function to show empty title if nothing is found
   * @param {* commits} props
   */
  Activity(props) {
    if (!props.commits.length) {
      return (
        <span>No Activity for user</span>
      );
    }
    var showMoreButton;
    if (props.showMore) {
      showMoreButton = (
        <>
        <button className={Style.btn_load_more} onClick={props.loadMoreCommits}>
          \\//
        </button>
        </>
      );
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
          <this.Activity
            commits={this.state.commits}
            loadMoreCommits={this.loadMoreCommits}
            showMore={this.state.showMore} />
        </div>
      </div>
      </>
    );
  }
}

export default CommitsModal;
