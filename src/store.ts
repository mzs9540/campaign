import * as _ from 'lodash';
import { applyMiddleware, compose, createStore } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers';

const blacklistTransform = createTransform((inboundState: any, key) => {
  if (key === 'authentication') {
    return _.omit(inboundState, [
      'auth.error',
      'otp.error',
      'otp.status',
    ]);
  }
  return inboundState;
});

const rootPersistConfig = {
  key: 'root',
  storage,
  transforms: [blacklistTransform],
  version: 1,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// eslint-disable-next-line max-len
const composeEnhances = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer, composeEnhances(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export {
  store,
  persistor,
};
