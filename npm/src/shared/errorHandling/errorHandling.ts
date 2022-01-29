import { ColorFormats } from '../consts/colorFormats';
import { ColorTypes } from '../consts/colorTypes';
import { Result } from '../types/result';

export class ErrorHandling {
  public static generateErrorResult(message: string): Result {
    return { filter: null, error: { message } };
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
}
