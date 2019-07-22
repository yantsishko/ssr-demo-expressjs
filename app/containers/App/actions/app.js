import superagent from 'superagent';
import { SET_USERS_SAGA, SET_USERS_ASYNC_CONNECT } from '../actionTypes';

export function setUsersData(users) {
  return {
    type: SET_USERS_SAGA,
    payload: {
      data: users,
    },
  };
}

export function getUsersData(params) {
  return async (dispatch) => {
    const { body: { results } } = await superagent.get(`https://randomuser.me/api/?results=10${params ? `&gender=${params.gender}` : ''}`);

    return dispatch({
      type: SET_USERS_ASYNC_CONNECT,
      payload: {
        data: results,
      },
    });
  };
}

