import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import routes from 'containers/App/routes/routesJson';
import {
  ReduxAsyncConnect,
} from 'redux-connect';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import configureStore from './configureStore';

import { StaticRoutesConfig } from './containers/App/routes/StaticRoutes';

// eslint-disable-next-line no-underscore-dangle
const initialState = !process.env.IS_SERVER ? window.__INITIAL_DATA__ : {};

const history = process.env.IS_SERVER
  ? createMemoryHistory({
    initialEntries: ['/'],
  })
  : createBrowserHistory();

const store = configureStore(initialState, history);
if (!process.env.IS_SERVER) {
  window.store = store;
}

const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

export const browserRender = () => {
  const dynamicRoutes = [...routes];
  dynamicRoutes[0].routes = [...dynamicRoutes[0].routes, ...StaticRoutesConfig];

  hydrate(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider key="provider" store={store} >
        <ConnectedRouter history={history}>
          <ReduxAsyncConnect helpers={{}} routes={dynamicRoutes} />
        </ConnectedRouter>
      </Provider>
    </StyleContext.Provider>,
    document.getElementById('app'),
  );
};
