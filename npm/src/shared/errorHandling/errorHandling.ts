import { Result } from '../types/result';

export class ErrorHandling {
  public static generateError(message: string): Result {
    return { filter: null, error: { message } };
  }
}
