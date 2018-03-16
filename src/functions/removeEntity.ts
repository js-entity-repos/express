import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import getJsonQueryParam from '../utils/getJsonQueryParam';
import handleTransaction from '../utils/handleTransaction';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return async (req: Request, res: Response) => {
    await handleTransaction({ config, req, res }, async () => {
      await config.service.removeEntity({
        filter: config.constructFilter(getJsonQueryParam(req.query, 'filter')),
        id: req.params.id,
      });
      res.status(NO_CONTENT).send();
    });
  };
};
