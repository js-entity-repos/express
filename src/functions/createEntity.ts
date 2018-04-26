import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return async (req: Request, res: Response) => {
    await config.handleTransaction({ req, res }, async () => {
      const { entity } = await config.service.createEntity({
        entity: config.constructEntity({ document: req.body, req, res }),
        id: req.body.id,
      });
      res.status(OK).json(config.constructDocument({ entity, req, res }));
    });
  };
};
