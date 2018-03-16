import { v4 as uuid } from 'uuid';
import handleError from './handleError';
import TransactionHandler from './TransactionHandler';

const handleTransaction: TransactionHandler = async ({ req, res }, handler) => {
  const transactionId = uuid();
  try {
    await handler({ transactionId });
  } catch (err) {
    handleError({ req, res, err, transactionId });
  }
};

export default handleTransaction;
