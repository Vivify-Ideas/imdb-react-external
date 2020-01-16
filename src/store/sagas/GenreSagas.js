import { call, put } from 'redux-saga/effects';
import genreService from '../../services/GenreService';
import { setGenres } from '../actions/GenreActions';
import { startRequest, endRequest } from '../actions/LoadingActions';
import { showErrorModal } from '../actions/ErrorActions';

export default function* genresGet() {
  try {
    yield put(startRequest());
    const { data } = yield call(genreService.getGenres);
    yield put(setGenres(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}
