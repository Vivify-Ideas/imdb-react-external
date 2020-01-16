import { call, put } from 'redux-saga/effects';
import { push, go } from 'connected-react-router';
import { authUser, loginError, registerError, setMe, setWatchList } from '../actions/AuthActions';
import AuthService from '../../services/AuthService';
import { startRequest, endRequest } from '../actions/LoadingActions';
import { showErrorModal } from '../actions/ErrorActions';

export function* userLogin({ payload }) {
  try {
    yield put(startRequest());
    yield call(AuthService.login, payload);
    yield put(authUser(true));
    yield put(push('/home'));
  } catch (error) {
    yield put(loginError(true));
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* googleLogin({ payload }) {
  try {
    yield put(startRequest());
    yield call(AuthService.googleLogin, payload);
    yield put(authUser(true));
    yield put(push('/home'));
  } catch (error) {
    yield put(loginError(true));
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* userAuth() {
  try {
    const isAuthenticated = yield call(AuthService.isAuthenticated);
    yield put(authUser(isAuthenticated));
  } catch (error) {
    yield put(loginError(true));
    yield put(showErrorModal({ message: error }));
  }
}

export function* userRegister({ payload }) {
  try {
    yield put(startRequest());
    yield call(AuthService.signup, payload);
    yield put(push('/login'));
    yield put(go());
  } catch (error) {
    yield put(registerError(true));
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* userIdentity() {
  try {
    yield put(startRequest());
    const data = yield call(AuthService.getMe);
    yield put(setMe(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* watchListGet() {
  try {
    const data = yield call(AuthService.getWatchList);
    yield put(setWatchList(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  }
}

export function* userLogout() {
  try {
    yield put(startRequest());
    yield call(AuthService.destroySession);
    yield put(authUser(false));
    yield put(push('/login'));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}
