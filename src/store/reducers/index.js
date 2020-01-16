import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import movieReducer from './MovieReducer';
import genreReducer from './GenreReducer';
import paginationReducer from './PaginationReducer';
import commentReducer from './CommentReducer';
import loadingReducer from './LoadingReducer';

export default history =>
  combineReducers({
    authUser: authReducer,
    error: errorReducer,
    movie: movieReducer,
    comment: commentReducer,
    genre: genreReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
    router: connectRouter(history)
  });
