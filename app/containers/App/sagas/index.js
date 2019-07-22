import { put, call, fork, all } from 'redux-saga/effects';
import superagent from 'superagent';

import { setUsersData } from './../actions/app';

export function* loadInitialData() {
  try {
    const { body: { results } } = yield call(superagent.get, 'https://randomuser.me/api/?results=10');

    yield put(setUsersData(results));
  } catch (e) {
    console.error(e);
  }
}

function* watch() {
  yield fork(loadInitialData);
}


function* appSagas() {
  yield all([
    fork(watch),
  ]);
}

export default appSagas;
