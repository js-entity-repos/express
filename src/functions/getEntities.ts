import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import getJsonQueryParam from '../utils/getJsonQueryParam';
import getNumberQueryParam from '../utils/getNumberQueryParam';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return async (req: Request, res: Response) => {
    await config.handleTransaction({ req, res }, async () => {
      const filter = getJsonQueryParam(req.query, 'filter');
      const limit = getNumberQueryParam(req.query, 'limit', config.defaultPaginationLimit);
      const result = await config.service.getEntities({
        filter: config.constructFilter({ filter, req, res }),
        pagination: {
          cursor: req.query.cursor,
          direction: req.query.direction,
          limit,
        },
        sort: getJsonQueryParam(req.query, 'sort'),
      });

      res.status(OK);
      if (result.backwardCursor !== undefined) {
        res.setHeader('x-entities-backward-cursor', result.backwardCursor);
      }
      if (result.forwardCursor !== undefined) {
        res.setHeader('x-entities-forward-cursor', result.forwardCursor);
      }
      res.setHeader('x-entities-has-more-backward', result.hasMoreBackward.toString());
      res.setHeader('x-entities-has-more-forward', result.hasMoreForward.toString());
      res.json(result.entities);
    });
  };
};
