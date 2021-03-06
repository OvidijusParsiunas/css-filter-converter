import { ErrorHandling } from '../../shared/functionality/errorHandling/errorHandling';
import { DEFAULT_CONVERSION_ERROR_MESSAGE } from '../../shared/consts/errors';
import { UnexpectedError } from '../../shared/types/unexpectedError';
import { ColorToFilterResult } from '../../shared/types/result';
import { ParseResult } from '../colorParser/colorParser';
import { RgbToFilterWorker } from './rgbToFilterWorker';
import { RGB } from 'color-convert/conversions';
import { RgbColor } from './rgbColor';

type ConvertToRgb<T> = (color: T) => RGB;

type ConversionProps<T> = {
  colorString: string;
  validateAndParse?: (colorString: string) => ParseResult<T>;
  convertToRgb?: ConvertToRgb<T>;
  conversionErrorMessage?: string;
  addSheen: boolean;
};

export class RgbToFilter {
  private static generateConversionError(conversionErrorMessage?: string): ColorToFilterResult<null> {
    const errorMessage = conversionErrorMessage || DEFAULT_CONVERSION_ERROR_MESSAGE;
    return ErrorHandling.generateErrorResult(errorMessage);
  }

  private static generateValidateAndParseError(errorMessage: string): ColorToFilterResult {
    return ErrorHandling.generateErrorResult(errorMessage);
  }

  private static execute(rgb: RGB, addSheen: boolean): ColorToFilterResult {
    const rgbColor = new RgbColor(rgb);
    const rgbToFilter = new RgbToFilterWorker(rgbColor, addSheen);
    return rgbToFilter.convert();
  }

  private static convertToRGB<T>(parseResultColor: T | null, convertToRgb?: ConvertToRgb<T>) {
    if (parseResultColor && convertToRgb) {
      return convertToRgb(parseResultColor);
    }
    return null;
  }

  public static convert<T>(conversionProps: ConversionProps<T>): ColorToFilterResult {
    try {
      const { colorString, validateAndParse, convertToRgb, conversionErrorMessage, addSheen } = conversionProps;
      const trimmedString = colorString.trim().toLocaleLowerCase();
      const parseResult = validateAndParse?.(trimmedString) || { color: trimmedString as unknown as T };
      if (ErrorHandling.hasError(parseResult)) return RgbToFilter.generateValidateAndParseError(parseResult.errorMessage);
      const rgbColor = RgbToFilter.convertToRGB(parseResult.color, convertToRgb) || (parseResult.color as unknown as RGB);
      if (!rgbColor) return RgbToFilter.generateConversionError(conversionErrorMessage);
      return RgbToFilter.execute(rgbColor, addSheen);
    } catch (error) {
      return ErrorHandling.generateUnexpectedError(error as UnexpectedError);
    }
  }
}
