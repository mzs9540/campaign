import { uuid } from 'uuidv4';

import { AppStorage } from '../AppStorage';
import { UserId } from '../interfaces';

import { User } from './interfaces';

export class AuthenticationAPI {
  store = new AppStorage({ prefix: 'users' });

  signIn(otp: string, phone: string): Promise<User | never> {
    const phoneWithCode = AuthenticationAPI.prependIndiaCountryCode(phone);
    return new Promise((resolve, reject) => {
      const users = this.store.getValue<User[]>('users');
      if (!users?.length) {
        return reject(new Error('No user found, Please do signup.'));
      }
      const index = users.findIndex((user) => {
        console.log(user.phone, phoneWithCode);
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

  signUp(otp: string, values: {
    phone: string,
    email: string,
    name: string,
  }): Promise<User | never> {
    return new Promise((resolve, reject) => {
      if (otp !== '1111') {
        return reject(new Error('Wrong OTP provided.'));
      }
      const phoneWithCode = AuthenticationAPI.prependIndiaCountryCode(
        values.phone,
      );
      const users = this.store.getValue<User[]>('users') || [];
      const index = users.findIndex((user) => {
        return user.phone === phoneWithCode || user.email === values.email;
      });

      if (index >= 0) {
        return reject(new Error('Phone/Email already exist please login.'));
      }
      const user = {
        id: uuid() as UserId,
        phone: values.phone,
        fullName: values.name,
        email: values.email,
        bio: '',
        profileImageUrl: 'https://picsum.photos/200/300?random=1200',
      };
      user.phone = phoneWithCode;
      users.push(user);
      this.store.setValue<User[]>('users', users);
      this.store.setValue<User>('user', user);
      return resolve(user);
    });
  }

  signOut(): Promise<boolean | never> {
    try {
      return new Promise((resolve) => {
        this.store.clearValue('user');
        return resolve(true);
      });
    } catch {
      return Promise.reject(new Error('Something went wrong.'));
    }
  }

  static prependIndiaCountryCode(phone) {
    return `91${phone}`;
  }
}
