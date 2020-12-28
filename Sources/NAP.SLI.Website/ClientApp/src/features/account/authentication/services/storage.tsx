const storageKey = 'account';

function save(account: any) {
  localStorage.setItem(storageKey, JSON.stringify(account));
}

function get() {
  return JSON.parse(localStorage.getItem(storageKey) as string);
}

function remove() {
  localStorage.removeItem(storageKey);
}

const getToken = () => {
  const account = get();
  return account?.token;
}

export default {
  save,
  get,
  remove,
  getToken
}