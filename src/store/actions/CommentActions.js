import {
  GET_COMMENTS,
  SET_COMMENTS,
  ADD_COMMENT,
  GET_SUB_COMMENTS,
  SET_SUB_COMMENTS,
  ADD_SUB_COMMENT
} from './ActionTypes';

export const getComments = payload => {
  return {
    type: GET_COMMENTS,
    payload
  };
};

export const getSubComments = payload => {
  return {
    type: GET_SUB_COMMENTS,
    payload
  };
};

export const setSubComments = payload => {
  return {
    type: SET_SUB_COMMENTS,
    payload
  };
};

export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload
  };
};

export const addSubComment = payload => {
  return {
    type: ADD_SUB_COMMENT,
    payload
  };
};

export const setComments = payload => {
  return {
    type: SET_COMMENTS,
    payload
  };
};
