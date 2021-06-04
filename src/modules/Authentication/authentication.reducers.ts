import { AuthState } from './interfaces';
import { SIGN_IN, SIGN_OUT } from './actions';

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authenticationReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return { ...initialState, isAuthenticated: true };
    }
    case SIGN_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
