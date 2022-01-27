import { INVALID_INPUT_DEFAULT_MESSAGE, UNEXPECTED_ERROR_MESSAGE_PREFIX } from '../../shared/consts/errors';
import { Result } from '../../shared/types/result';
import { RGB } from 'color-convert/conversions';
import { RgbColor } from '../rgbColor/rgbColor';
import { RgbToFilter } from './rgbToFilter';

type ValidateAndParse<T> = (color: string) => T | undefined;

type ConvertObject<T> = {
  color: string;
  validateAndParse?: ValidateAndParse<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  convertToRgb?: any;
  invalidInputMessage?: string;
};

export class RgbToFilterConverter {
  private static execute(rgb: RGB): Result {
    const rgbColor = new RgbColor(rgb);
    const rgbToFilter = new RgbToFilter(rgbColor);
    return rgbToFilter.convert();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getRgb<T>(color: string, validateAndParse?: ValidateAndParse<T>, convert?: any): RGB {
    const result = validateAndParse?.(color) || color;
    return convert?.(result) || [0, 0, 0];
  }

  public static convert<T>(convertObject: ConvertObject<T>): Result {
    try {
      const { color, validateAndParse, convertToRgb: convert, invalidInputMessage } = convertObject;
      const rgb = RgbToFilterConverter.getRgb(color, validateAndParse, convert);
      if (!rgb) return { filter: null, error: { message: invalidInputMessage || INVALID_INPUT_DEFAULT_MESSAGE } };
      return RgbToFilterConverter.execute(rgb);
    } catch (error) {
      return { filter: null, error: { message: `${UNEXPECTED_ERROR_MESSAGE_PREFIX}: ${(error as Error).message}` } };
    }
  }
}
