import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { connectRouter } from 'connected-react-router/immutable';

import appReducer from 'containers/App/reducers/app';

import {
  immutableReducer as reduxAsyncConnect,
  setToImmutableStateFunc,
  setToMutableStateFunc,
} from 'redux-connect';

setToImmutableStateFunc(mutableState => fromJS(mutableState));
setToMutableStateFunc(immutableState => immutableState.toJS());

export default history => combineReducers({
  reduxAsyncConnect,
  router: connectRouter(history),
  appReducer,
});
