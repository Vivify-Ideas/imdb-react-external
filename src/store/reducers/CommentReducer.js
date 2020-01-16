import { SET_COMMENTS, SET_SUB_COMMENTS } from '../actions/ActionTypes';

const initialState = {
  comments: [],
  subComments: []
};
const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.payload.data };
    case SET_SUB_COMMENTS:
      return { ...state, subComments: action.payload };
    default:
      return state;
  }
};

export default genreReducer;
