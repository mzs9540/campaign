import { uuid } from 'uuidv4';

import { AppStorage } from '../AppStorage';
import { UserId } from '../interfaces';

import { User } from './interfaces';

export class AuthenticationAPI {
  store = new AppStorage({ prefix: 'users' });

  signIn(phone: string, otp: string): Promise<User | never> {
    const phoneWithCode = AuthenticationAPI.prependIndiaCountryCode(phone);
    return new Promise((resolve, reject) => {
      const users = this.store.getValue<User[]>('users');
      if (!users?.length) {
        return reject(new Error('No users.'));
      }
      const index = users.findIndex((user) => {
        return user.phone === phoneWithCode;
      });

      if (index < 0) {
        return reject(new Error('No user found, Please do signup.'));
      }
      const user = users[index];
      if (otp !== '1111') {
        return reject(new Error('Wrong OTP provided.'));
      }
      return resolve(user);
    });
  }

  signUp(otp: string, values: any): Promise<User | never> {
    return new Promise((resolve, reject) => {
      if (otp !== '1111') {
        return reject(new Error('Wrong OTP provided.'));
      }
      const user = {
        id: uuid() as UserId,
        phone: values.phone,
        fullName: values.name,
        email: values.email,
        bio: values?.bio,
        profileImageUrl: 'https://picsum.photos/200/300?random=1200',
      };
      user.phone = AuthenticationAPI.prependIndiaCountryCode(values.phone);
      this.store.setValue<User>('user', user);
      return resolve(user);
    });
  }

  static prependIndiaCountryCode(phone) {
    return `91${phone}`;
  }
}
