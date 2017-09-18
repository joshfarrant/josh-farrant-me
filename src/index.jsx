

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import rootSaga from './sagas';
import Root from './components/Root';

store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('react-container'),
);
