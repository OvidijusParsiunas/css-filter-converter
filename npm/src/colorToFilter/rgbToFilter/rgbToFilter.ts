import { INVALID_INPUT_DEFAULT_MESSAGE, UNEXPECTED_ERROR_MESSAGE_PREFIX } from '../../shared/consts/errors';
import { ParseAndValidateResult } from '../rgbColor/rgbColorParser';
import { RgbToFilterWorker } from './rgbToFilterWorker';
import { Result } from '../../shared/types/result';
import { RGB } from 'color-convert/conversions';
import { RgbColor } from '../rgbColor/rgbColor';

type ValidateAndParse<T> = (color: string) => ParseAndValidateResult<T>;

type ConvertObject<T> = {
  color: string;
  validateAndParse?: ValidateAndParse<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  convertToRgb?: any;
  invalidInputMessage?: string;
};

export class RgbToFilter {
  private static execute(rgb: RGB): Result {
    const rgbColor = new RgbColor(rgb);
    const rgbToFilter = new RgbToFilterWorker(rgbColor);
    return rgbToFilter.convert();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getRgb<T>(color: string, validateAndParse?: ValidateAndParse<T>, convertToRgb?: any): RGB {
    const result = validateAndParse?.(color) || color;
    return convertToRgb?.(result) || [0, 0, 0];
  }

  public static convert<T>(convertObject: ConvertObject<T>): Result {
    try {
      const { color, validateAndParse, convertToRgb, invalidInputMessage } = convertObject;
      const rgb = RgbToFilter.getRgb(color, validateAndParse, convertToRgb);
      if (!rgb) return { filter: null, error: { message: invalidInputMessage || INVALID_INPUT_DEFAULT_MESSAGE } };
      return RgbToFilter.execute(rgb);
    } catch (error) {
      return { filter: null, error: { message: `${UNEXPECTED_ERROR_MESSAGE_PREFIX}: \n${(error as Error).message}` } };
    }
  }
}
