export const isFalsy = (value) => (value === 0 ? false : !!value);

export const cleanObejct = (object) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (!isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};
