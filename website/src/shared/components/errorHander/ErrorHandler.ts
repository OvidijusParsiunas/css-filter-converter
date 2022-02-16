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
}
