import { SHOW_ERROR_MODAL, CLOSE_ERROR_MODAL } from './ActionTypes';

export const showErrorModal = payload => {
  return {
    type: SHOW_ERROR_MODAL,
    payload
  };
};

export const closeErrorModal = () => {
  return {
    type: CLOSE_ERROR_MODAL
  };
};
