import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import movieService from '../../services/MovieService';
import omdbService from '../../services/OMDbService';
import {
  setMovies,
  setMovie,
  setOMDbSuggest,
  setRelatedMovies,
  setTopRated
} from '../actions/MovieActions';
import updatePaginationState from '../actions/PaginationActions';
import { setWatchList } from '../actions/AuthActions';
import { startRequest, endRequest } from '../actions/LoadingActions';
import { showErrorModal } from '../actions/ErrorActions';

export function* moviesGet({ payload }) {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.getMovies, payload);
    const { count } = data;
    yield put(updatePaginationState({ count }));
    yield put(setMovies({ data }));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* topRatedGet() {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.getTopRated);
    yield put(setTopRated({ data }));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* movieGet(id) {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.getMovie, id);
    yield put(setMovie(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* relatedMoviesGet({ payload }) {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.getRelatedMovies, payload);
    yield put(setRelatedMovies(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* movieCreate({ movie }) {
  try {
    yield put(startRequest());
    const {
      data: { _id }
    } = yield call(movieService.createMovie, movie);
    yield put(push(`/movies/${_id}`));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* movieLike({ movieId }) {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.likeMovie, { movieId });
    yield put(setMovie(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* movieDislike({ movieId }) {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.dislikeMovie, { movieId });
    yield put(setMovie(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* movieWatch({ movieId }) {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.watchMovie, { movieId });
    yield put(setWatchList(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* movieUnWatch({ movieId }) {
  try {
    yield put(startRequest());
    const { data } = yield call(movieService.unWatchMovie, { movieId });
    yield put(setWatchList(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* omdbFind({ query }) {
  try {
    yield put(startRequest());
    const data = yield call(omdbService.findByTitle, { query });
    yield put(setOMDbSuggest(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}
