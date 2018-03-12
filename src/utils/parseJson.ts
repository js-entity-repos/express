import JsonSyntaxError from './JsonSyntaxError';

export default (data: string, path: string[]) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new JsonSyntaxError(path);
    }
    /* istanbul ignore next */
    throw err;
  }
};
