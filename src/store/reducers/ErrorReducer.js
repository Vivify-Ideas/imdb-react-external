import {
  LOGIN_ERROR,
  REGISTER_ERROR,
  SHOW_ERROR_MODAL,
  CLOSE_ERROR_MODAL
} from '../actions/ActionTypes';

const initialState = {
  loginError: false,
  registerError: false,
  showErrorModal: false,
  errorModalMessage: ''
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, loginError: action.payload };
    case REGISTER_ERROR:
      return { ...state, registerError: action.payload };
    case SHOW_ERROR_MODAL:
      return {
        ...state,
        showErrorModal: true,
        errorModalMessage: action.payload.message
      };
    case CLOSE_ERROR_MODAL:
      return { ...state, showErrorModal: false };
    default:
      return state;
  }
};

export default errorReducer;
