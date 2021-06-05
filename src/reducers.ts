import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import { userReducers } from 'modules/Users';
import { authenticationReducers } from 'modules/Authentication';

export const rootReducer = combineReducers({
  form: formReducer,
  authentication: authenticationReducers,
  users: userReducers,
});
