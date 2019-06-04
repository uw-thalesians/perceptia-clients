import * as actionTypes from './actionTypes';

export const initialState = {
  items: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE:
      return {
        items: {
          ...state.items, // Re Adds every user back in
          ...action.items.reduce((prev, curr) => ({
            ...prev, // Re adds all users to object that have already been filtered
            [curr.uuid]: curr, // Updates each user passed in action.items
          }), {}),// initial value for accumulator
        },
      };
    case actionTypes.DELETE_ALL:
      return {
        items: {},
      };
    case actionTypes.DELETE:
      return {
        items: {
          ...state.items,
          ...action.uuids.reduce((prev, curr) => ({
            ...prev,
            [curr]:state.items[curr]
          }), {}),
        }
      };
    default:
      return state;
  }
};