import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import  createHistory from '../util/createHistory';

import rootReducer from './reducers';
import rootSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

const history = createHistory;
const store = createStore(
  rootReducer(history),
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
 );

sagaMiddleware.run(rootSaga);

export default store;
