import Entity from '@js-entity-repos/core/dist/types/Entity';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { v4 as uuid } from 'uuid';
import FacadeConfig from '../FacadeConfig';

export interface Opts<E extends Entity> {
  readonly config: FacadeConfig<E>;
  readonly req: Request;
  readonly res: Response;
}

export interface HandlerOpts {
  readonly transactionId: string;
}

export type Handler = (opts: HandlerOpts) => Promise<void>;

export default async <E extends Entity>({ config, req, res }: Opts<E>, handler: Handler) => {
  const transactionId = uuid();
  try {
    await handler({ transactionId });
  } catch (err) {
    config.handleError({ req, res, err, transactionId });
  }
};
