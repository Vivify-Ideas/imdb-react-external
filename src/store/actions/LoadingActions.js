import { START_REQUEST, END_REQUEST } from './ActionTypes';

export const startRequest = () => {
  return {
    type: START_REQUEST
  };
};

export const endRequest = () => {
  return {
    type: END_REQUEST
  };
};
