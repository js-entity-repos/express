import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';

export interface Opts {
  readonly req: Request;
  readonly res: Response;
  readonly document: any;
}

type EntityConstructor<E extends Entity> = (opts: Opts) => E;

export default EntityConstructor;
