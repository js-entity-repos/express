import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return catchErrors(async (req: Request, res: Response) => {
    await config.service.removeEntity({
      filter: JSON.parse(req.query.filter),
      id: req.params.id,
    });
    res.status(NO_CONTENT).send();
  });
};
