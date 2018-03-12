import parseJson from './parseJson';
import Query from './Query';

export default (data: Query, paramName: string) => {
  const paramValue = data[paramName];
  return paramValue === undefined ? undefined : parseJson(paramValue, [paramName]);
};
