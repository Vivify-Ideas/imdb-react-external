import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { likeMovie, dislikeMovie } from '../store/actions/MovieActions';
import WatchedButton from './WatchedButton';

export class MoviePreview extends Component {
  likeMovie = () => {
    const { movie, likeMovie } = this.props;
    likeMovie(movie._id);
  };

  dislikeMovie = () => {
    const { dislikeMovie, movie } = this.props;
    dislikeMovie(movie._id);
  };

  render() {
    const { movie } = this.props;
    return (
      <div className="card-body border-bottom">
        <div className="row">
          <div className="col-md-6" />
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <WatchedButton movieId={movie._id} isClickable={false} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              className="img-fluid d-block img-thumbnail"
              alt={movie.imageUrl}
              src={movie.imageUrl}
              width="150px"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title font-weight-bold">{movie.title}</h5>
              <p className="card-text">{movie.description}&nbsp;</p>
              <div className="row mt-2">
                <div className="col-md-6 d-flex justify-content-start align-items-center">
                  <button type="button" className="btn btn-success btn-sm" onClick={this.likeMovie}>
                    <i className="fa fa-thumbs-o-up fa-fw fa-1x py-1" /> ({movie.likes})
                  </button>
                  <button
                    type="button"
                    className="btn ml-1 btn-danger btn-sm"
                    onClick={this.dislikeMovie}
                  >
                    <i className="fa fa-thumbs-o-down fa-fw fa-1x py-1" />({movie.dislikes})
                  </button>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                  <Link to={`/movies/${movie._id}`}>Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  likeMovie,
  dislikeMovie
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MoviePreview)
);
