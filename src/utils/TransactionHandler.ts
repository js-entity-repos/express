import { Response } from 'express';
import { Request } from 'express-serve-static-core';

export interface Opts {
  readonly req: Request;
  readonly res: Response;
}

export interface HandlerOpts {
  readonly transactionId: string;
}

export type Handler = (opts: HandlerOpts) => Promise<void>;

type TransactionHandler = (opts: Opts, handler: Handler) => Promise<void>;

export default TransactionHandler;
