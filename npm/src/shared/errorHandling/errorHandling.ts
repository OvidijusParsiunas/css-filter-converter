import { ColorFormats } from '../consts/colorFormats';
import { ColorToFilterResult } from '../types/result';
import { ColorTypes } from '../consts/colorTypes';

export class ErrorHandling {
  public static generateErrorResult(message: string): ColorToFilterResult {
    return { result: null, error: { message } };
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
