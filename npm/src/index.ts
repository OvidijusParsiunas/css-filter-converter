import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { RgbParser } from './colorToFilter/color/rgbParser';
import { ErrorHandler } from './colorToFilter/errorHandler';
import { ColorStringTypes } from './types/colorStringTypes';
import { RgbColor } from './colorToFilter/color/rgbColor';
import { Result } from './types/result';

export default class CssFilterConverter {
  private static convertToFilter(colorString: string, type: ColorStringTypes): Result {
    try {
      const rgb = RgbParser.colorStringToRgb(colorString, type);
      const rgbColor = new RgbColor(rgb);
      const cssGenerator = new ColorToFilter(rgbColor);
      return cssGenerator.generate();
    } catch (error: unknown) {
      return ErrorHandler.returnErrorResult(error);
    }
  }

  // WORK - regex validator
  public static hexToFilter(hex: string): Result {
    return CssFilterConverter.convertToFilter(hex, ColorStringTypes.HEX);
  }

  // WORK - regex validator
  public static rgbToFilter(rgb: string): Result {
    return CssFilterConverter.convertToFilter(rgb, ColorStringTypes.RGB);
  }

  // WORK - regex validator
  public static async filterToRgb(): Promise<string | null> {
    return FilterToColor.generate();
  }
}
