import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import { authenticationReducers } from 'modules/Authentication';

export const rootReducer = combineReducers({
  form: formReducer,
  authentication: authenticationReducers,
});
