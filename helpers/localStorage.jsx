export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getData = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  if (!data) {
    return null;
  }
  return data;
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};
