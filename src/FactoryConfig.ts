import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import FilterConstructor from './utils/FilterConstructor';
import TransactionHandler from './utils/TransactionHandler';

export default interface FactoryConfig<E extends Entity> {
  readonly constructFilter?: FilterConstructor<E>;
  readonly service: Facade<E>;
  readonly handleTransaction?: TransactionHandler;
  readonly defaultPaginationLimit?: number;
}
