import { AuthState } from './interfaces';
import { USER, SIGN_OUT } from './actions';

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authenticationReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER: {
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
