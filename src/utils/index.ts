export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(object).forEach(key => {
    //@ts-ignore
    const value = object[key]
    if (!value) {
      //@ts-ignore
      delete result[key]
    }
  })
  return result
}
