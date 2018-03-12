import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import ErrorCatcher from './ErrorCatcher';
import JsonSyntaxError from './JsonSyntaxError';

const errorCatcher: ErrorCatcher = (handler) => {
  return (req, res) => {
    handler(req, res).catch((err) => {
      if (err instanceof ConflictingEntityError) {
        return res.status(CONFLICT).send();
      }
      if (err instanceof MissingEntityError) {
        return res.status(NOT_FOUND).send();
      }
      if (err instanceof JsonSyntaxError) {
        return res.status(BAD_REQUEST).send();
      }
      /* istanbul ignore next */
      return res.status(INTERNAL_SERVER_ERROR).send();
    });
  };
};

export default errorCatcher;
