import { DEFAULT_CONVERSION_ERROR_MESSAGE } from '../../shared/consts/errors';
import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { UnexpectedError } from '../../shared/types/unexpectedError';
import { ColorToFilterResult } from '../../shared/types/result';
import { ParseResult } from '../colorParser/colorParser';
import { RgbToFilterWorker } from './rgbToFilterWorker';
import { RGB } from 'color-convert/conversions';
import { RgbColor } from './rgbColor';

type ConversionProps<T> = {
  colorString: string;
  validateAndParse?: (colorString: string) => ParseResult<T>;
  convertToRgb?: (color: T) => RGB;
  conversionErrorMessage?: string;
};

export class RgbToFilter {
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
      const { colorString, validateAndParse, convertToRgb, conversionErrorMessage } = conversionProps;
      const parseResult = validateAndParse?.(colorString) || { color: colorString as unknown as T };
      if (ErrorHandling.hasError(parseResult)) return RgbToFilter.generateValidateAndParseError(parseResult.errorMessage);
      const conversionResult = convertToRgb?.(parseResult.color) || (parseResult.color as unknown as RGB);
      if (!conversionResult) return RgbToFilter.generateConversionError(conversionErrorMessage);
      return RgbToFilter.execute(conversionResult);
    } catch (error) {
      return ErrorHandling.generateUnexpectedError(error as UnexpectedError);
    }
  }
}
