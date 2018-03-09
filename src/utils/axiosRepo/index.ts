import factory from '@js-entity-repos/axios/dist/factory';
import Facade from '@js-entity-repos/core/dist/Facade';
import { TestEntity } from '@js-entity-repos/core/dist/tests/utils/testEntity';
import axios from 'axios';

export default (): Facade<TestEntity> => {
  return factory({
    axios: axios.create({
      baseURL: `http://localhost:80/api/todos`,
    }),
    entityName: 'Test Entity',
  });
};
