import {
  GET_MOVIES,
  GET_RELATED_MOVIES,
  SET_RELATED_MOVIES,
  GET_TOP_RATED,
  SET_TOP_RATED,
  GET_MOVIE,
  LIKE_MOVIE,
  DISLIKE_MOVIE,
  SET_MOVIES,
  SET_MOVIE,
  OMDB_SEARCH,
  SET_OMDB_SUGGEST,
  CREATE_MOVIE,
  WATCH_MOVIE,
  UN_WATCH_MOVIE
} from './ActionTypes';

export const getMovies = payload => {
  return {
    type: GET_MOVIES,
    payload
  };
};

export const getRelatedMovies = payload => {
  return {
    type: GET_RELATED_MOVIES,
    payload
  };
};

export const setRelatedMovies = payload => {
  return {
    type: SET_RELATED_MOVIES,
    payload
  };
};

export const getTopRated = () => {
  return {
    type: GET_TOP_RATED
  };
};

export const setTopRated = payload => {
  return {
    type: SET_TOP_RATED,
    payload
  };
};

export const omdbSearch = query => {
  return {
    type: OMDB_SEARCH,
    query
  };
};

export const getMovie = id => {
  return {
    type: GET_MOVIE,
    id
  };
};

export const likeMovie = movieId => {
  return {
    type: LIKE_MOVIE,
    movieId
  };
};

export const dislikeMovie = movieId => {
  return {
    type: DISLIKE_MOVIE,
    movieId
  };
};

export const watchMovie = movieId => {
  return {
    type: WATCH_MOVIE,
    movieId
  };
};

export const unWatchMovie = movieId => {
  return {
    type: UN_WATCH_MOVIE,
    movieId
  };
};

export const setMovies = payload => {
  return {
    type: SET_MOVIES,
    payload
  };
};

export const setOMDbSuggest = payload => {
  return {
    type: SET_OMDB_SUGGEST,
    payload
  };
};

export const setMovie = payload => {
  return {
    type: SET_MOVIE,
    payload
  };
};

export const createMovie = movie => {
  return {
    type: CREATE_MOVIE,
    movie
  };
};
