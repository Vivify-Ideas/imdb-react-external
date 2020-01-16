import { AUTH_USER, SET_ME, SET_WATCH_LIST } from '../actions/ActionTypes';

const initialState = {
  isLoggedIn: false,
  loggedInUser: {},
  watchList: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isLoggedIn: action.payload };
    case SET_ME:
      return { ...state, loggedInUser: action.payload };
    case SET_WATCH_LIST:
      return { ...state, watchList: action.payload };
    default:
      return state;
  }
};

export const getWatchedIds = watchList => watchList.map(watchListItem => watchListItem.movie);

export default authReducer;
