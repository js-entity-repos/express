import { Request, Response } from 'express';

export interface Opts {
  readonly req: Request;
  readonly res: Response;
  readonly err: any;
  readonly transactionId: string;
}

type ErrorHandler = (opts: Opts) => void;

export default ErrorHandler;
