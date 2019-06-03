import * as actionTypes from './actionTypes';

export const initialState = {
  tokens: {
    access: {
      type: null,
      value: null,
    },
  },
  user: {
    uuid: null,
  },
  authenticated: false,
  active: false,
  uuid: null,
  id: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.UPDATE:
      return {
        ...action.session,
      };
      case actionTypes.DELETE:
        return {};
    default:
      return state;
  }
};