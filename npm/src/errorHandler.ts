import { Result } from './types/result';

export class ErrorHandler {
  // have error handling when parsing incoming strings
  public static returnErrorResult(error: Error): Result {
    return { filter: null, error: { message: error.message } };
  }
}
