import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import FacadeConfig from '../FacadeConfig';
import getJsonQueryParam from '../utils/getJsonQueryParam';

export default <E extends Entity>(config: FacadeConfig<E>) => {
  return async (req: Request, res: Response) => {
    await config.handleTransaction({ req, res }, async () => {
      const filter = getJsonQueryParam(req.query, 'filter');
      const { entity } = await config.service.patchEntity({
        filter: config.constructFilter({ filter, req, res }),
        id: req.params.id,
        patch: config.constructPatch({ document: req.body, req, res }),
      });
      res.status(OK).json(config.constructDocument({ entity, req, res }));
    });
  };
};
