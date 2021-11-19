const storageKey = 'account';

export type Account = {
  username: string;
  userId: number;
  isAdmin: boolean;
  token: string;
};

const save = (account: Account) => {
  localStorage.setItem(storageKey, JSON.stringify(account));
};

const get = () => {
  const storageValue = localStorage.getItem(storageKey);
  if (storageValue) {
    try {
      return JSON.parse(storageValue) as Account;
    } catch {
      return undefined;
    }
  }
};

const remove = () => {
  localStorage.removeItem(storageKey);
};

const getToken = () => {
  const account = get();
  return account?.token;
};

export default {
  save,
  get,
  remove,
  getToken,
};
