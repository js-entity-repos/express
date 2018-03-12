import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import catchErrors from '../utils/catchErrors';
import getJsonQueryParam from '../utils/getJsonQueryParam';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return catchErrors(async (req: Request, res: Response) => {
    const { entity } = await config.service.patchEntity({
      filter: getJsonQueryParam(req.query, 'filter'),
      id: req.params.id,
      patch: req.body,
    });
    res.status(OK).json(entity);
  });
};
