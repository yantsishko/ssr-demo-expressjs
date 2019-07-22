import { createSelector } from 'reselect';

export const getAppReducer = state => state.get('appReducer');

export const getUsersSaga = createSelector(
  getAppReducer,
  router => router.get('usersFromSaga'),
);

export const getUsersAsyncConnect = createSelector(
  getAppReducer,
  router => router.get('usersFromAsyncConnect'),
);
