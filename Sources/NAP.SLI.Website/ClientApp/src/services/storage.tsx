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
      remove();
      return undefined;
    }
  }
};

const remove = () => {
  localStorage.removeItem(storageKey);
};

export default {
  save,
  get,
  remove,
};
