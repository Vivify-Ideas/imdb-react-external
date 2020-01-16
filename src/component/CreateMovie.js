import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Select from 'react-select';
import { createMovie, omdbSearch } from '../store/actions/MovieActions';
import { getGenres } from '../store/actions/GenreActions';
import debounce from '../util/debounce';
import getGenreStrings from '../util/stringUtils';

export class CreateMovie extends Component {
  state = {
    title: '',
    description: '',
    imageUrl: '',
    genres: []
  };

  componentDidMount() {
    const { getGenres, omdbSearch } = this.props;
    getGenres();

    this.delayedOMDbSearch = debounce(() => {
      const { title } = this.state;
      omdbSearch(title);
    }, 1000);
  }

  componentDidUpdate = prevProps => {
    const { omdbSuggest, genres } = this.props;
    if (prevProps.omdbSuggest !== omdbSuggest) {
      this.setState({
        title: omdbSuggest.Title,
        description: omdbSuggest.Plot,
        imageUrl: omdbSuggest.Poster,
        genres: this.getMatchingGenres(genres, getGenreStrings(omdbSuggest.Genre))
      });
    }
  };

  componentWillUnmount() {
    this.delayedOMDbSearch.cancel();
  }

  handleInputChange = field => event => {
    if (field === 'title') {
      this.delayedOMDbSearch();
    }

    const fieldValue = event.target.value;
    this.setState({ [field]: fieldValue });

    if (field === 'title' && fieldValue.length === 0) {
      this.setState({
        title: '',
        description: '',
        imageUrl: '',
        genres: []
      });
    }
  };

  handleGenreChange = selectedGenres => {
    if (selectedGenres) {
      this.setGenreValues(selectedGenres);
    }
  };

  setGenreValues = selectedGenres => {
    this.setState(prevState => ({ ...prevState, genres: selectedGenres || null }));
  };

  getMatchingGenres = (savedGenres, suggestedGenres) => {
    const matchingGenres = savedGenres.filter(genre => {
      return suggestedGenres.includes(genre.name);
    });
    return this.mapFormat(matchingGenres);
  };

  mapFormat = genreArray => {
    return genreArray.map(genre => {
      return { value: genre._id, label: genre.name };
    });
  };

  submit = event => {
    event.preventDefault();
    const { genres } = this.state;
    const { createMovie } = this.props;
    const newMovie = {
      ...this.state,
      genres: genres.map(genre => genre.value)
    };
    createMovie(newMovie);
  };

  render() {
    const { title, description, genres, imageUrl } = this.state;
    return (
      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.submit}>
                    <h4 className="text-center">Add movie:</h4>
                    <div className="row">
                      <div className="col-md-4" />
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            onChange={this.handleInputChange('title')}
                            type="text"
                            value={title}
                            className="form-control"
                            placeholder="Enter title"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-md-4" />
                    </div>
                    <div className="row">
                      <div className="col-md-4" />
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            onChange={this.handleInputChange('description')}
                            value={description}
                            type="text"
                            className="form-control w-100"
                            placeholder="Enter description"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-md-4" />
                    </div>
                    <div className="row">
                      <div className="col-md-4" />
                      <div className="col-md-4">
                        <Select
                          className="mb-2"
                          isMulti
                          placeholder="Select genres"
                          value={genres}
                          onChange={this.handleGenreChange}
                          // eslint-disable-next-line react/destructuring-assignment
                          options={this.mapFormat(this.props.genres)}
                        />
                      </div>
                      <div className="col-md-4" />
                    </div>
                    <div className="row">
                      <div className="col-md-4" />
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            onChange={this.handleInputChange('imageUrl')}
                            type="text"
                            value={imageUrl}
                            className="form-control"
                            placeholder="Enter image URL"
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="col-md-4" />
                    </div>
                    <div className="row">
                      <div className="col-md-4" />
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <input type="submit" className="btn w-25 btn-success" value="Save" />
                      </div>
                      <div className="col-md-4" />
                    </div>
                  </form>
                </div>
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
    omdbSuggest: state.movie.OMDbSuggest,
    genres: state.genre.dbGenres
  };
};

const mapDispatchToProps = {
  createMovie,
  omdbSearch,
  getGenres
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateMovie)
);
