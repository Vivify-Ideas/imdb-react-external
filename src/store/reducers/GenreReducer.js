import { SET_GENRES } from '../actions/ActionTypes';

const initialState = {
  dbGenres: []
};
const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GENRES:
      return { ...state, dbGenres: action.payload.data };
    default:
      return state;
  }
};

export default genreReducer;
