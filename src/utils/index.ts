export const isFalsy = (value: any) => (value === 0 ? false : !!value);

export const cleanObejct = (object: object) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = object[key];
    if (!isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });

  return result;
};
