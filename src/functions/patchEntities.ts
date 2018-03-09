import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return catchErrors(async (req: Request, res: Response) => {
    const { entity } = await config.service.patchEntity({
      filter: JSON.parse(req.query.filter),
      id: req.params.id,
      patch: req.body,
    });
    res.status(OK).json(entity);
  });
};
