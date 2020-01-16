import { START_REQUEST, END_REQUEST } from '../actions/ActionTypes';

const initialState = {
  requestCount: 0
};
const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REQUEST:
      const newIncrementedState = state.requestCount + 1;
      return { ...state, requestCount: newIncrementedState };
    case END_REQUEST:
      const newDecrementedState = state.requestCount === 0 ? 0 : state.requestCount - 1;
      return { ...state, requestCount: newDecrementedState };
    default:
      return state;
  }
};

export default loadingReducer;
