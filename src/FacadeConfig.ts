import Facade from '@js-entity-repos/core/dist/Facade';
import Entity from '@js-entity-repos/core/dist/types/Entity';
import ErrorCatcher from './utils/ErrorCatcher';

export default interface FacadeConfig<E extends Entity> {
  readonly service: Facade<E>;
  readonly errorCatcher: ErrorCatcher;
}
