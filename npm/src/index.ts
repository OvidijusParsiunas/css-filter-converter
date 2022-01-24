import { FilterCssGenerator } from './filterCssConverter/filterCssGenerator';
import { ErrorHandler } from './filterCssConverter/errorHandler';
import { FilterToColor } from './filterToColor/filterToColor';
import { ColorStringTypes } from './types/colorStringTypes';
import { Color } from './filterCssConverter/color';
import { Result } from './types/result';

export default class CssFilterConverter {
  private static convertToFilter(colorString: string, type: ColorStringTypes): Result {
    try {
      const color = new Color(colorString, type);
      const cssGenerator = new FilterCssGenerator(color);
      return cssGenerator.generate();
    } catch (error: unknown) {
      return ErrorHandler.returnErrorResult(error);
    }
  }

  // WORK - regex validator
  public static hexToFilter(hex: string): Result {
    return CssFilterConverter.convertToFilter(hex, 'hex');
  }

  // WORK - regex validator
  public static rgbToFilter(rgb: string): Result {
    return CssFilterConverter.convertToFilter(rgb, 'rgb');
  }

  // WORK - regex validator
  public static async filterToRgb(): Promise<string | null> {
    return FilterToColor.generate();
  }
}
