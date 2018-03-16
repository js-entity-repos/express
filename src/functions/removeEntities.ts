import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import getJsonQueryParam from '../utils/getJsonQueryParam';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return async (req: Request, res: Response) => {
    await config.handleTransaction({ req, res }, async () => {
      const filter = getJsonQueryParam(req.query, 'filter');
      await config.service.removeEntities({
        filter: config.constructFilter({ filter, req, res }),
      });
      res.status(NO_CONTENT).send();
    });
  };
};
