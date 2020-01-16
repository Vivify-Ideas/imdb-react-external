import { all, takeLatest } from 'redux-saga/effects';
import {
  LOGIN,
  GOOGLE_LOGIN,
  LOGOUT,
  GET_ME,
  REGISTER,
  GET_MOVIES,
  GET_RELATED_MOVIES,
  GET_MOVIE,
  LIKE_MOVIE,
  DISLIKE_MOVIE,
  WATCH_MOVIE,
  UN_WATCH_MOVIE,
  CREATE_MOVIE,
  IS_AUTHENTICATED,
  OMDB_SEARCH,
  GET_GENRES,
  GET_COMMENTS,
  GET_WATCH_LIST,
  GET_SUB_COMMENTS,
  ADD_COMMENT,
  ADD_SUB_COMMENT,
  GET_TOP_RATED
} from '../actions/ActionTypes';
import {
  userLogin,
  googleLogin,
  userRegister,
  userIdentity,
  userLogout,
  userAuth,
  watchListGet
} from './AuthSagas';
import {
  moviesGet,
  movieGet,
  movieLike,
  movieDislike,
  movieCreate,
  omdbFind,
  movieWatch,
  movieUnWatch,
  topRatedGet,
  relatedMoviesGet
} from './MovieSagas';
import genresGet from './GenreSagas';
import { commentsGet, commentAdd, subCommentsGet, subCommentAdd } from './CommentSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(LOGIN, userLogin),
    takeLatest(GOOGLE_LOGIN, googleLogin),
    takeLatest(REGISTER, userRegister),
    takeLatest(IS_AUTHENTICATED, userAuth),
    takeLatest(GET_ME, userIdentity),
    takeLatest(GET_WATCH_LIST, watchListGet),
    takeLatest(LOGOUT, userLogout),
    takeLatest(GET_MOVIES, moviesGet),
    takeLatest(GET_MOVIE, movieGet),
    takeLatest(CREATE_MOVIE, movieCreate),
    takeLatest(LIKE_MOVIE, movieLike),
    takeLatest(DISLIKE_MOVIE, movieDislike),
    takeLatest(WATCH_MOVIE, movieWatch),
    takeLatest(UN_WATCH_MOVIE, movieUnWatch),
    takeLatest(OMDB_SEARCH, omdbFind),
    takeLatest(GET_GENRES, genresGet),
    takeLatest(GET_COMMENTS, commentsGet),
    takeLatest(ADD_COMMENT, commentAdd),
    takeLatest(GET_SUB_COMMENTS, subCommentsGet),
    takeLatest(ADD_SUB_COMMENT, subCommentAdd),
    takeLatest(GET_RELATED_MOVIES, relatedMoviesGet),
    takeLatest(GET_TOP_RATED, topRatedGet)
  ]);
}
