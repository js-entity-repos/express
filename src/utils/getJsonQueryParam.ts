import parseJson from './parseJson';

export default (data: { readonly [k: string]: string | undefined }, paramName: string) => {
  const paramValue = data[paramName];
  return paramValue === undefined ? undefined : parseJson(paramValue, [paramName]);
};
