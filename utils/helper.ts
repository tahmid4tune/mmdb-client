export const except = <T>(obj: T, except: Array<string>): Partial<T> => {
  return Object.keys(obj)
    .filter((key) => !except.includes(key))
    .reduce((result: { [p: string]: unknown }, key) => {
      result[key] = getProperty(obj, key);
      return result;
    }, {} as Partial<T>) as Partial<T>;
};

export const getProperty = <T>(o: T, propertyName: string): unknown => {
  return o[propertyName as keyof T];
};
