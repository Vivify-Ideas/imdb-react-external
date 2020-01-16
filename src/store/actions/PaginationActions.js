import { UPDATE_PAGINATION_STATE } from './ActionTypes';

const updatePaginationState = payload => {
  return {
    type: UPDATE_PAGINATION_STATE,
    payload
  };
};

export default updatePaginationState;
