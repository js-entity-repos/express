import { Request, Response } from 'express';

export type Handler = (req: Request, res: Response) => Promise<void>;

type ErrorCatcher = (handler: Handler) => (req: Request, res: Response) => void;

export default ErrorCatcher;
