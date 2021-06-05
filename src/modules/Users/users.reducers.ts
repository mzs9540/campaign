import { USER, SIGN_OUT } from '../Authentication/actions';

const initialState = {
  id: null,
  fullName: null,
  bio: null,
  phone: null,
  email: null,
  profileImageUrl: null,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER: {
      return {
        ...initialState,
        id: action.user.id,
        fullName: action.user.fullName,
        bio: action.user.bio,
        phone: action.user.phone,
        email: action.user.email,
        profileImageUrl: action.user.profileImageUrl,
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
