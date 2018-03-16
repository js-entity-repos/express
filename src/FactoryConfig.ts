import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Filter } from '@js-entity-repos/core/dist/types/Filter';
import ErrorHandler from './utils/ErrorHandler';

export default interface FactoryConfig<E extends Entity> {
  readonly constructFilter?: (filter: Filter<E>) => any;
  readonly service: Facade<E>;
  readonly handleError?: ErrorHandler;
  readonly defaultPaginationLimit?: number;
}
