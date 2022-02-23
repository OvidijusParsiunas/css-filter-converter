import { UNEXPECTED_ERROR_MESSAGE_INTRODUCTION } from 'css-filter-converter/lib/shared/consts/errors';
import { UnexpectedError } from 'css-filter-converter/lib/shared/types/unexpectedError';
import { displayError, hideError } from '../../../state/error/actions';
import { store } from '../../../state/store';

export class ErrorHandler {
  public static displayMessageOnConsole(message: string): void {
    /* eslint-disable no-console */
    console.error(message);
  }

  public static displayError(message?: string) {
    if (message) ErrorHandler.displayMessageOnConsole(message);
    const { dispatch } = store.getState().error;
    dispatch?.(displayError());
  }

  public static executeEvent<F extends (...params: unknown[]) => unknown, R = ReturnType<F>>(callback: F): R | null {
    try {
      const { dispatch } = store.getState().error;
      dispatch?.(hideError());
      return callback() as R;
    } catch (error) {
      ErrorHandler.displayError(`${UNEXPECTED_ERROR_MESSAGE_INTRODUCTION}. Reason: ${(error as UnexpectedError).message}`);
    }
    return null;
  }
}
