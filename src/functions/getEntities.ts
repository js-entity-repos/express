import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';
import getJsonQueryParam from '../utils/getJsonQueryParam';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return catchErrors(async (req: Request, res: Response) => {
    const result = await config.service.getEntities({
      filter: getJsonQueryParam(req.query, 'filter'),
      pagination: {
        cursor: req.query.cursor,
        forward: req.query.forward === 'true',
        limit: Number(req.query.limit),
      },
      sort: getJsonQueryParam(req.query, 'sort'),
    });
    res.status(OK).json(result);
  });
};
