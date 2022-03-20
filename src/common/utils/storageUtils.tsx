const isWindowDefined = () => typeof window !== 'undefined';

const getFromLocalStorage = (key: string) => {
  if (isWindowDefined()) {
    return localStorage.getItem(key);
  }
};

const setToLocalStorage = (key: string, value: string) => {
  if (isWindowDefined()) {
    localStorage.setItem(key, value);
  }
};

const StorageUtils = {
  localStorage: {
    get: getFromLocalStorage,
    set: setToLocalStorage,
  },
};

export default StorageUtils;
