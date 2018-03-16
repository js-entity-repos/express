import ConflictingEntityError from '@js-entity-repos/core/dist/errors/ConflictingEntityError';
import MissingEntityError from '@js-entity-repos/core/dist/errors/MissingEntityError';
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
import ErrorHandler from './ErrorHandler';
import JsonError from './JsonError';
import NumberError from './NumberError';

const handleError: ErrorHandler = ({ res, err, transactionId }) => {
  const sendErrorResponse = (statusCode: number, errorData: object) => {
    const body = {
      ...errorData,
      transactionId,
    };
    res.status(statusCode).json(body);
  };
  if (err instanceof ConflictingEntityError) {
    return sendErrorResponse(CONFLICT, {
      entityId: err.entityId,
      entityName: err.entityName,
    });
  }
  if (err instanceof MissingEntityError) {
    return sendErrorResponse(NOT_FOUND, {
      entityId: err.entityId,
      entityName: err.entityName,
    });
  }
  if (err instanceof JsonError) {
    return sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });
  }
  if (err instanceof NumberError) {
    return sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });
  }
  /* istanbul ignore next */
  return sendErrorResponse(INTERNAL_SERVER_ERROR, {});
};

export default handleError;
