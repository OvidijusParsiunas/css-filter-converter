import { UNEXPECTED_ERROR_MESSAGE_PREFIX } from '../consts/errors';
import { UnexpectedError } from '../types/unexpectedError';
import { ColorFormats } from '../consts/colorFormats';
import { ColorToFilterResult } from '../types/result';
import { ColorTypes } from '../consts/colorTypes';
import { Error } from '../types/error';

export class ErrorHandling {
  public static generateErrorResult(message: string): ColorToFilterResult {
    return { color: null, error: { message } };
  }

  public static generateInputErrorMessage(colorType: ColorTypes, colorString: string, format?: ColorFormats): string {
    const errorPrefix = `Input ${colorType} color string could not be parsed.`;
    const actualStringReceived = `String received: ${colorString}.`;
    const messageStrings = [errorPrefix, actualStringReceived];
    if (format) {
      const expectedFormat = `Expected format: ${format}.`;
      messageStrings.splice(1, 0, expectedFormat);
    }
    return messageStrings.join(' ');
  }

  public static generateUnexpectedError(error: UnexpectedError): ColorToFilterResult {
    const errorMessage = `${UNEXPECTED_ERROR_MESSAGE_PREFIX}: \n${error.message}`;
    return ErrorHandling.generateErrorResult(errorMessage);
  }

  public static hasError<T>(param: T | Error): param is Error {
    return !!(param as Error).errorMessage;
  }
}
