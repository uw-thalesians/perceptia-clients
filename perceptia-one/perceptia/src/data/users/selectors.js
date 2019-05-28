import store from './../../store';

export const read = (userUuid) => {
  if (Object.is(userUuid, '')) {
    return {};
  } else {
    const { items } = store.getState().data.users;
    return {...items.filter((currUser)=> {
        return Object.is(currUser.uuid, userUuid);
      })};
  }
};

export const readAll = () => {
  return store.getState().data.users;
};