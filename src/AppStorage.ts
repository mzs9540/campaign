/* eslint-disable class-methods-use-this */

class AppStorage {
  prefix: string;

  constructor({ prefix }) {
    this.prefix = prefix;
  }

  getValue<T = any>(param: string): T | null {
    try {
      const value = localStorage.getItem(`${this.prefix}_${param}`);
      if (!value) {
        return null;
      }
      return JSON.parse(value) as T;
    } catch (err) {
      throw new Error('NO_VALUE');
    }
  }

  setValue<T = any>(param: string, valueIn: T) {
    try {
      const value = JSON.stringify(valueIn);
      localStorage.setItem(`${this.prefix}_${param}`, value);
    } catch (err) {
      throw new Error('NO_VALUE');
    }
  }

  clearValue(param: string): void {
    try {
      localStorage.removeItem(`${this.prefix}_${param}`);
    } catch (err) {
      throw new Error('NO_VALUE');
    }
  }

  static clearAll(): void {
    try {
      localStorage.clear();
    } catch (err) {
      throw new Error('NO_VALUE');
    }
  }
}

export { AppStorage };
