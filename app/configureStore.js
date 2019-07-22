import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router/immutable';
import createRootReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  const sagaMiddleWare = createSagaMiddleware();
  const middlewares = [
    thunk,
    routerMiddleware(history),
    sagaMiddleWare,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createRootReducer(history),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleWare.run;
  store.close = () => store.dispatch(END);
  // Extensions
  store.injectedReducers = {}; // Reducer registry

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(store.injectedReducers));
    });
  }

  return store;
}
