import {
  SET_MOVIES,
  SET_MOVIE,
  SET_OMDB_SUGGEST,
  SET_RELATED_MOVIES,
  SET_TOP_RATED
} from '../actions/ActionTypes';

const initialState = {
  data: [],
  count: 0,
  currentMovie: {},
  OMDbSuggest: {},
  relatedMovies: [],
  topRated: []
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, ...action.payload.data };
    case SET_MOVIE:
      const updatedData = state.data.map(movie =>
        movie._id === action.payload._id ? action.payload : movie
      );
      return { ...state, data: updatedData, currentMovie: action.payload };
    case SET_TOP_RATED:
      return { ...state, topRated: action.payload.data };
    case SET_OMDB_SUGGEST:
      return { ...state, OMDbSuggest: action.payload };
    case SET_RELATED_MOVIES:
      return { ...state, relatedMovies: action.payload };
    default:
      return state;
  }
};

export default movieReducer;
