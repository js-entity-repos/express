import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import DocumentConstructor from './utils/DocumentConstructor';
import EntityConstructor from './utils/EntityConstructor';
import FilterConstructor from './utils/FilterConstructor';
import PatchConstructor from './utils/PatchConstructor';
import TransactionHandler from './utils/TransactionHandler';

export default interface FactoryConfig<E extends Entity> {
  readonly constructDocument?: DocumentConstructor<E>;
  readonly constructEntity?: EntityConstructor<E>;
  readonly constructFilter?: FilterConstructor<E>;
  readonly constructPatch?: PatchConstructor<E>;
  readonly service: Facade<E>;
  readonly handleTransaction?: TransactionHandler;
  readonly defaultPaginationLimit?: number;
}
