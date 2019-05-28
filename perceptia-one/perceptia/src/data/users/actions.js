import * as actionTypes from './actionTypes';

const update = items => ({
  type: actionTypes.UPDATE,
  items,
});

export const deleteSpecific = (uuids) => ({
  type: actionTypes.DELETE,
  uuids,

});

export const deleteAll = () => ({
  type: actionTypes.DELETE_ALL,
});

