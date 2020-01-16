import { UPDATE_PAGINATION_STATE } from '../actions/ActionTypes';

const initialState = {
  limit: 5,
  offset: 0,
  count: 0
};
const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGINATION_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default paginationReducer;
