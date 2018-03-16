import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Filter } from '@js-entity-repos/core/dist/types/Filter';
import { Request, Response } from 'express';

export interface Opts<E extends Entity> {
  readonly req: Request;
  readonly res: Response;
  readonly filter: Filter<E>;
}

type FilterConstructor<E extends Entity> = (opts: Opts<E>) => Filter<E>;

export default FilterConstructor;
