import { UnexpectedError } from 'css-filter-converter/lib/shared/types/unexpectedError';
import { displayError } from '../../../state/error/actions';
import { store } from '../../../state/store';

export class ErrorHandler {
  public static displayMessageOnConsole(message: string): void {
    console.error(message);
  }

  public static displayError(message?: string) {
    if (message) ErrorHandler.displayMessageOnConsole(message);
    const dispatchAlternative = store.getState().error.dispatch;
    dispatchAlternative?.(displayError());
  }

  private static handleUnexpectedEventError(error: UnexpectedError): void {
    // wrap text in unexpected error
    ErrorHandler.displayMessageOnConsole(error.message);
    const dispatchAlternative = store.getState().error.dispatch;
    dispatchAlternative?.(displayError());
  }

  public static catchEventError<F extends (...params: unknown[]) => unknown, R = ReturnType<F>>(callback: F): R | null {
    try {
      return callback() as R;
    } catch (error) {
      ErrorHandler.handleUnexpectedEventError(error as UnexpectedError);
    }
    return null;
  }
}

// export default connect(null, mapDispatchToProps)(LoginPage)
