// tslint:disable:no-class
import { BaseError } from 'make-error';

export default class NumberError extends BaseError {
  constructor(public data: any, public path: string[]) {
    super();
  }
}
