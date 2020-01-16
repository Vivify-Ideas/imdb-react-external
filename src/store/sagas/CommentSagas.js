import { call, put } from 'redux-saga/effects';
import commentService from '../../services/CommentService';
import { setComments, setSubComments } from '../actions/CommentActions';
import updatePaginationState from '../actions/PaginationActions';
import { startRequest, endRequest } from '../actions/LoadingActions';
import { showErrorModal } from '../actions/ErrorActions';

export function* commentsGet({ payload }) {
  try {
    yield put(startRequest());
    const { data } = yield call(commentService.getComments, payload);
    yield put(setComments(data));
    const { count } = data;
    yield put(updatePaginationState({ count }));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* subCommentsGet({ payload }) {
  try {
    yield put(startRequest());
    const { data } = yield call(commentService.getSubComments, payload);
    const { subComments } = data;
    yield put(setSubComments(subComments));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* commentAdd({ payload }) {
  try {
    yield put(startRequest());
    const { data } = yield call(commentService.createComment, payload);
    yield put(setComments(data));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}

export function* subCommentAdd({ payload }) {
  try {
    yield put(startRequest());
    const { data } = yield call(commentService.createSubComment, payload);
    const { subComments } = data;
    yield put(setSubComments(subComments));
  } catch (error) {
    yield put(showErrorModal({ message: error }));
  } finally {
    yield put(endRequest());
  }
}
