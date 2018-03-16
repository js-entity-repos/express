import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import Filter from '@js-entity-repos/core/dist/types/Filter';
import TransactionHandler from './utils/TransactionHandler';

export default interface FacadeConfig<E extends Entity> {
  readonly constructFilter: (filter: Filter<E>) => any;
  readonly service: Facade<E>;
  readonly handleTransaction: TransactionHandler;
  readonly defaultPaginationLimit: number;
}
