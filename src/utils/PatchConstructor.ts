import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';

export interface Opts {
  readonly req: Request;
  readonly res: Response;
  readonly document: any;
}

type PatchConstructor<E extends Entity> = (opts: Opts) => Partial<E>;

export default PatchConstructor;
