import { fromJS } from 'immutable';
import { SET_USERS_ASYNC_CONNECT, SET_USERS_SAGA } from '../actionTypes';

const initialState = fromJS({
  usersFromSaga: [],
  usersFromAsyncConnect: [],
});

const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_SAGA: {
      return state.set('usersFromSaga', fromJS(action.payload.data));
    }
    case SET_USERS_ASYNC_CONNECT: {
      return state.set('usersFromAsyncConnect', fromJS(action.payload.data));
    }
    default:
      return state;
  }
};

export default app;

