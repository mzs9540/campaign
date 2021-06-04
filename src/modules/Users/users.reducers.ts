import { SIGN_IN, SIGN_OUT } from '../Authentication/actions';

import { UserState } from './interfaces';

const initialState: UserState = {
  fullName: null,
  bio: null,
  profileImageUrl: null,
};

export const authenticationReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...initialState,
        fullName: action.fullName,
        bio: action.bio,
        profileImageUrl: action.profileImageUrl,
      };
    }
    case SIGN_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
