import NumberError from './NumberError';
import Query from './Query';

export default <T>(query: Query, paramName: string, defaultValue: T) => {
  const paramValue = query[paramName];
  if (paramValue === undefined) {
    return defaultValue;
  }
  const parsedParamValue = Number(paramValue);
  if (isNaN(parsedParamValue)) {
    throw new NumberError(paramValue, [paramName]);
  }
  return parsedParamValue;
};
