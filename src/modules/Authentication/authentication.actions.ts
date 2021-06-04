import * as authActions from './actions';

import { User } from 'API/interfaces';

export const signIn = (userDetails: User | null) => ({
  type: authActions.SIGN_IN,
  user: userDetails,
});

export const signOut = () => ({
  type: authActions.SIGN_OUT,
});
