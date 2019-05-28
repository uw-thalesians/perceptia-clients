import store from './../../store';

export const read = () => store.getState().services.session;