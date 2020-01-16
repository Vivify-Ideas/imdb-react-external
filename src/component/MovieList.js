import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import MoviePreview from './MoviePreview';
import debounce from '../util/debounce';
import Pagination from './Pagination';
import { getGenres } from '../store/actions/GenreActions';
import { getMovies, getTopRated } from '../store/actions/MovieActions';

export class MovieList extends Component {
  constructor(props) {
    super();
    this.state = {
      title: null,
      limit: props.currentLimit,
      offset: props.currentOffset,
      genres: null
    };
  }

  componentDidMount() {
    const { getMovies, getGenres, getTopRated } = this.props;
    getMovies({ ...this.state });
    getGenres();
    getTopRated();

    this.delayedSearch = debounce(() => {
      getMovies({ ...this.state });
    }, 750);
  }

  componentDidUpdate(prevProps, prevState) {
    const { genres } = this.state;
    const { getMovies } = this.props;
    if (genres !== prevState.genres) {
      getMovies({ ...this.state });
    }
  }

  componentWillUnmount() {
    this.delayedSearch.cancel();
  }

  getGenreList = () => {
    const { genres } = this.props;
    return genres.map(genre => <option key={genre._id} value={genre._id}>{genre.name}</option>);
  };

  handleGenreChange = e => {
    const genreId = e.target.value;
    this.setState({ genres: genreId });
  };

  handleInputChange = field => event => {
    const fieldValue = event.target.value;
    this.setState({ [field]: fieldValue, genres: null }, () => {
      this.delayedSearch();
    });
  };

  generateTopRated = () => {
    const { topRated } = this.props;
    return topRated.map(movie => (
      <Link className="list-group-item list-group-item-action" key={movie._id} to={`/movies/${movie._id}`}>
        {movie.title}
      </Link>
    ));
  };

  submitSearch = e => {
    const { getMovies } = this.props;
    e.preventDefault();
    getMovies({ ...this.state });
  };

  render() {
    const { movies, getMovies } = this.props;
    const { query } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <div className="card text-center">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <form className="form-inline">
                      <div className="input-group w-100">
                        <input
                          type="text"
                          name="query"
                          className="form-control"
                          id="inlineFormInputGroup"
                          placeholder="Search"
                          value={query}
                          onChange={this.handleInputChange('title')}
                        />
                        <div className="input-group-append">
                          <button
                            type="submit"
                            className="btn btn-dark"
                            onClick={this.submitSearch}
                          >
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <h5 className="">Featured movies</h5>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <select
                        className="w-75 rounded"
                        style={{ height: '40px' }}
                        defaultValue=""
                        onChange={this.handleGenreChange}
                      >
                        <option value="" disabled>
                          Pick genre
                        </option>
                        {this.getGenreList()}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {movies.map(movie => (
                  <MoviePreview key={movie._id} movie={movie} />
                ))}
              </div>
              <div className="card-footer text-muted">
                <Pagination action={getMovies} params={this.state} />
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card text-center">
              <div className="card-header">
                <h5>Top rated movies</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">{this.generateTopRated()}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getMovies,
  getGenres,
  getTopRated
};

const mapStateToProps = state => {
  return {
    movies: state.movie.data,
    genres: state.genre.dbGenres,
    currentOffset: state.pagination.offset,
    currentLimit: state.pagination.limit,
    topRated: state.movie.topRated
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MovieList)
);
