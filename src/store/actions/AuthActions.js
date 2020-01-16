import {
  LOGIN,
  AUTH_USER,
  REGISTER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  GET_ME,
  SET_ME,
  LOGOUT,
  IS_AUTHENTICATED,
  GET_WATCH_LIST,
  SET_WATCH_LIST,
  GOOGLE_LOGIN
} from './ActionTypes';

export const logIn = logInData => {
  return {
    type: LOGIN,
    payload: logInData
  };
};

export const googleLogin = payload => {
  return {
    type: GOOGLE_LOGIN,
    payload
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const register = registerData => {
  return {
    type: REGISTER,
    payload: registerData
  };
};

export const authUser = payload => {
  return {
    type: AUTH_USER,
    payload
  };
};

export const getMe = () => {
  return {
    type: GET_ME
  };
};

export const getWatchList = () => {
  return {
    type: GET_WATCH_LIST
  };
};

export const setWatchList = payload => {
  return {
    type: SET_WATCH_LIST,
    payload
  };
};

export const isAuthenticated = () => {
  return {
    type: IS_AUTHENTICATED
  };
};

export const setMe = payload => {
  return {
    type: SET_ME,
    payload
  };
};

export const loginError = payload => {
  return {
    type: LOGIN_ERROR,
    payload
  };
};

export const registerError = payload => {
  return {
    type: REGISTER_ERROR,
    payload
  };
};
