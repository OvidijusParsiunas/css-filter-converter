import { DEFAULT_CONVERSION_ERROR_MESSAGE, UNEXPECTED_ERROR_MESSAGE_PREFIX } from '../../shared/consts/errors';
import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { ValidateAndParseResult } from '../rgbColor/rgbColorParser';
import { ColorToFilterResult } from '../../shared/types/result';
import { RgbToFilterWorker } from './rgbToFilterWorker';
import { RGB } from 'color-convert/conversions';
import { RgbColor } from '../rgbColor/rgbColor';

type ConversionProps<T> = {
  color: string;
  validateAndParse?: (color: string) => ValidateAndParseResult<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  convertToRgb?: any;
  conversionErrorMessage?: string;
};

export class RgbToFilter {
  private static generateUnexpectedError(error: Error): ColorToFilterResult {
    const errorMessage = `${UNEXPECTED_ERROR_MESSAGE_PREFIX}: \n${error.message}`;
    return ErrorHandling.generateErrorResult(errorMessage);
  }

  private static generateConversionError(conversionErrorMessage?: string): ColorToFilterResult {
    const errorMessage = conversionErrorMessage || DEFAULT_CONVERSION_ERROR_MESSAGE;
    return ErrorHandling.generateErrorResult(errorMessage);
  }

  private static generateValidateAndParseError(errorMessage: string): ColorToFilterResult {
    return ErrorHandling.generateErrorResult(errorMessage);
  }

  private static execute(rgb: RGB): ColorToFilterResult {
    const rgbColor = new RgbColor(rgb);
    const rgbToFilter = new RgbToFilterWorker(rgbColor);
    return rgbToFilter.convert();
  }

  public static convert<T>(conversionProps: ConversionProps<T>): ColorToFilterResult {
    try {
      const { color, validateAndParse, convertToRgb, conversionErrorMessage } = conversionProps;
      const parseResult = validateAndParse?.(color) || { result: color as unknown as T };
      if (parseResult.errorMessage) return RgbToFilter.generateValidateAndParseError(parseResult.errorMessage);
      const conversionResult = convertToRgb?.(parseResult.result);
      if (!conversionResult) return RgbToFilter.generateConversionError(conversionErrorMessage);
      return RgbToFilter.execute(conversionResult);
    } catch (error) {
      return RgbToFilter.generateUnexpectedError(error as Error);
    }
  }
}
