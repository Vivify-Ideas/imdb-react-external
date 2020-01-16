import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getMovie, likeMovie, dislikeMovie, getRelatedMovies } from '../store/actions/MovieActions';
import WatchedButton from './WatchedButton';
import Comments from './Comments';

export class Movie extends Component {
  constructor(props) {
    super();
    const { match } = props;
    this.state = {
      movieId: match.params.id
    };
  }

  componentDidMount() {
    const { getMovie } = this.props;
    const { movieId } = this.state;
    getMovie(movieId);
  }

  componentDidUpdate(prevProps) {
    const { movie, getMovie, getRelatedMovies, match } = this.props;
    if (prevProps.movie !== movie) {
      getRelatedMovies({
        movieId: match.params.id,
        genres: movie.genres
      });
    }
    if (prevProps.match.params.id !== match.params.id) {
      getMovie(match.params.id);
    }
  }

  likeMovie = () => {
    const { movieId } = this.state;
    const { likeMovie } = this.props;
    likeMovie(movieId);
  };

  dislikeMovie = () => {
    const { dislikeMovie } = this.props;
    const { movieId } = this.state;
    dislikeMovie(movieId);
  };

  generateRelated = () => {
    const { relatedMovies } = this.props;
    return relatedMovies.map(movie => (
      <Link key={movie._id} className="list-group-item list-group-item-action" to={`/movies/${movie._id}`}>
        {movie.title}
      </Link>
    ));
  };

  render() {
    const { movie } = this.props;
    const { movieId } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <div className="card mb-2">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6" />
                  <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <h5 className="mr-2">Visited: {movie.visits} time(s)</h5>
                    <WatchedButton movieId={movie._id} isClickable={true} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img className="img-fluid d-block" alt={movie.imageUrl} src={movie.imageUrl} />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>{movie.title}</b>
                      </h5>
                      <p className="card-text">{movie.description}</p>
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-6">
                    <button type="button" className="btn btn-success" onClick={this.likeMovie}>
                      <i className="fa fa-thumbs-o-up fa-fw fa-1x py-1" /> ({movie.likes})
                    </button>
                    <button
                      type="button"
                      className="btn ml-1 btn-danger"
                      onClick={this.dislikeMovie}
                    >
                      <i className="fa fa-thumbs-o-down fa-fw fa-1x py-1" />({movie.dislikes})
                    </button>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-info">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <Comments movieId={movieId} />
            </div>
          </div>
          <div className="col-md-2">
            <div className="card text-center">
              <div className="card-header">
                <h5>Related movies</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">{this.generateRelated()}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movie.currentMovie,
    relatedMovies: state.movie.relatedMovies
  };
};

const mapDispatchToProps = {
  getMovie,
  getRelatedMovies,
  likeMovie,
  dislikeMovie
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Movie)
);
