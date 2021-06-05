import * as authActions from './actions';

import { User } from 'API/interfaces';

export const user = (userDetails: User | null) => ({
  type: authActions.USER,
  user: userDetails,
});

export const signOut = () => ({
  type: authActions.SIGN_OUT,
});
