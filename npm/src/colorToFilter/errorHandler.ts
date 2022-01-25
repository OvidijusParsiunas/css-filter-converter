import { Result } from '../types/result';

export class ErrorHandler {
  private static readonly DEFAULT_ERROR_MESSAGE = 'Error';

  public static returnErrorResult(error: unknown): Result {
    if (error instanceof Error) {
      return { filter: null, error: { message: error.message } };
    }
    return { filter: null, error: { message: ErrorHandler.DEFAULT_ERROR_MESSAGE } };
  }
}
