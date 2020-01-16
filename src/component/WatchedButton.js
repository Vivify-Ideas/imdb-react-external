import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWatchedIds } from '../store/reducers/AuthReducer';
import { watchMovie, unWatchMovie } from '../store/actions/MovieActions';

export class WatchedButton extends Component {
  constructor(props) {
    super();
    const { isClickable } = props;
    this.state = {
      isWatched: false,
      isClickable
    };
  }

  componentDidUpdate(prevProps) {
    const { watchList } = this.props;
    if (prevProps.watchList !== watchList) {
      this.calculateWatchState();
    }
  }

  watchMovie = () => {
    const { watchMovie, movieId } = this.props;
    watchMovie(movieId);
  };

  unWatchMovie = () => {
    const { unWatchMovie, movieId } = this.props;
    unWatchMovie(movieId);
  };

  calculateWatchState() {
    const { watchList, movieId } = this.props;
    const isWatched = watchList.includes(movieId);
    this.setState(prevState => ({ ...prevState, isWatched }));
  }

  calculateButtonState() {
    const { isWatched, isClickable } = this.state;
    const iconClassName = isWatched ? 'fa fa-star' : 'fa fa-star-o';
    const onClickAction = isWatched ? this.unWatchMovie : this.watchMovie;
    return (
      <button
        type="button"
        className="btn btn-info"
        onClick={onClickAction}
        disabled={!isClickable}
      >
        <i className={iconClassName} aria-hidden="true" />
      </button>
    );
  }

  render() {
    return this.calculateButtonState();
  }
}

const mapStateToProps = state => {
  return {
    watchList: getWatchedIds(state.authUser.watchList)
  };
};

const mapDispatchToProps = {
  watchMovie,
  unWatchMovie
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WatchedButton)
);
