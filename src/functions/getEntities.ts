import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import getJsonQueryParam from '../utils/getJsonQueryParam';
import getNumberQueryParam from '../utils/getNumberQueryParam';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return async (req: Request, res: Response) => {
    await config.handleTransaction({ req, res }, async () => {
      const limit = getNumberQueryParam(req.query, 'limit', config.defaultPaginationLimit);
      const result = await config.service.getEntities({
        filter: config.constructFilter(getJsonQueryParam(req.query, 'filter')),
        pagination: {
          cursor: req.query.cursor,
          forward: req.query.forward === 'true',
          limit,
        },
        sort: getJsonQueryParam(req.query, 'sort'),
      });
      res.status(OK);
      if (result.nextCursor !== undefined) {
        res.setHeader('x-entities-next-cursor', result.nextCursor);
      }
      if (result.previousCursor !== undefined) {
        res.setHeader('x-entities-previous-cursor', result.previousCursor);
      }
      res.json(result.entities);
    });
  };
};
