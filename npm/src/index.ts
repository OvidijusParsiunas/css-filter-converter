import { ColorParser } from './colorToFilter/color/colorParser';
import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { ErrorHandler } from './colorToFilter/errorHandler';
import { RgbColor } from './colorToFilter/color/rgbColor';
import { KEYWORD, RGB } from 'color-convert/conversions';
import * as Converter from 'color-convert';
import { Result } from './types/result';

// NO EXCEPTION - just warnings
export default class CssFilterConverter {
  private static convertToFilter(rgb: RGB): Result {
    try {
      const rgbColor = new RgbColor(rgb);
      const cssGenerator = new ColorToFilter(rgbColor);
      return cssGenerator.generate();
    } catch (error: unknown) {
      return ErrorHandler.returnErrorResult(error);
    }
  }

  public static rgbToFilter(rgb: string): Result {
    const result = ColorParser.parseAndValidateRGB(rgb);
    return CssFilterConverter.convertToFilter(result);
  }

  public static hexToFilter(hex: string): Result {
    ColorParser.validateHex(hex);
    const rgb = Converter.hex.rgb(hex);
    return CssFilterConverter.convertToFilter(rgb);
  }

  public static hslToFilter(hsl: string): Result {
    const result = ColorParser.parseAndValidateHSL(hsl);
    const rgb = Converter.hsl.rgb(result);
    return CssFilterConverter.convertToFilter(rgb);
  }

  public static keywordToFilter(keyword: KEYWORD): Result {
    const rgb = Converter.keyword.rgb(keyword);
    if (!rgb) throw new Error('error');
    return CssFilterConverter.convertToFilter(rgb);
  }

  // WORK - regex validator
  public static async filterToRgb(): Promise<string> {
    return FilterToColor.generate(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }
}
