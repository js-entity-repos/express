import Entity from '@js-entity-repos/core/dist/types/Entity';
import { json } from 'body-parser';
import { Router } from 'express';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import countEntities from './functions/countEntities';
import createEntity from './functions/createEntity';
import getEntities from './functions/getEntities';
import getEntity from './functions/getEntity';
import patchEntities from './functions/patchEntities';
import removeEntities from './functions/removeEntities';
import removeEntity from './functions/removeEntity';
import replaceEntity from './functions/replaceEntity';
import handleTransaction from './utils/handleTransaction';

export default <E extends Entity>(factoryConfig: FactoryConfig<E>): Router => {
  const facadeConfig: FacadeConfig<E> = {
    constructFilter: (filter) => filter,
    defaultPaginationLimit: 10,
    handleTransaction,
    ...factoryConfig,
  };
  const router = Router();

  router.use(json());

  router.get('/count', countEntities(facadeConfig));
  router.delete('/:id', removeEntity(facadeConfig));
  router.get('/:id', getEntity(facadeConfig));
  router.patch('/:id', patchEntities(facadeConfig));
  router.put('/:id', replaceEntity(facadeConfig));
  router.delete('', removeEntities(facadeConfig));
  router.get('', getEntities(facadeConfig));
  router.post('', createEntity(facadeConfig));

  return router;
};
