import { GET_GENRES, SET_GENRES } from './ActionTypes';

export const getGenres = () => {
  return {
    type: GET_GENRES
  };
};

export const setGenres = payload => {
  return {
    type: SET_GENRES,
    payload
  };
};
