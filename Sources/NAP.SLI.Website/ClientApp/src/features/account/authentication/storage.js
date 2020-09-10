const storageKey = 'account';

function save(account) {
  localStorage.setItem(storageKey, JSON.stringify(account));
}

function get() {
  return JSON.parse(localStorage.getItem(storageKey));
}

function remove() {
  localStorage.removeItem(storageKey);
}

export default {
  save,
  get,
  remove
}