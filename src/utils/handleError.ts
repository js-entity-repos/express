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
    sendErrorResponse(CONFLICT, {
      entityId: err.entityId,
      entityName: err.entityName,
    });
    return;
  }
  if (err instanceof MissingEntityError) {
    sendErrorResponse(NOT_FOUND, {
      entityId: err.entityId,
      entityName: err.entityName,
    });
    return;
  }
  if (err instanceof JsonError) {
    sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });
    return;
  }
  if (err instanceof NumberError) {
    sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });
    return;
  }
  /* istanbul ignore next */
  {
    sendErrorResponse(INTERNAL_SERVER_ERROR, {});
    return;
  }
};

export default handleError;
