// tslint:disable:no-class
import { BaseError } from 'make-error';

export default class JsonSyntaxError extends BaseError {
  constructor(public path: string[]) {
    super();
  }
}
