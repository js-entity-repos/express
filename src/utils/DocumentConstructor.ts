import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request, Response } from 'express';

export interface Opts<E extends Entity> {
  readonly req: Request;
  readonly res: Response;
  readonly entity: E;
}

type DocumentConstructor<E extends Entity> = (opts: Opts<E>) => any;

export default DocumentConstructor;
