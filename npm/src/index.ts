import { RgbColorParser } from './colorToFilter/rgbColor/rgbColorParser';
import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { RgbColor } from './colorToFilter/rgbColor/rgbColor';
import { KEYWORD, RGB } from 'color-convert/conversions';
import * as Converter from 'color-convert';
import { Result } from './types/result';

// NO EXCEPTION - just warnings
export default class CssFilterConverter {
  private static convertToFilter(rgb: RGB): Result {
    const rgbColor = new RgbColor(rgb);
    const cssGenerator = new ColorToFilter(rgbColor);
    return cssGenerator.generate();
  }

  public static rgbToFilter(rgb: string): Result {
    const result = RgbColorParser.parseAndValidateRGB(rgb);
    return CssFilterConverter.convertToFilter(result);
  }

  public static hexToFilter(hex: string): Result {
    RgbColorParser.validateHex(hex);
    const rgb = Converter.hex.rgb(hex);
    return CssFilterConverter.convertToFilter(rgb);
  }

  public static hslToFilter(hsl: string): Result {
    const result = RgbColorParser.parseAndValidateHSL(hsl);
    const rgb = Converter.hsl.rgb(result);
    return CssFilterConverter.convertToFilter(rgb);
  }

  public static keywordToFilter(keyword: KEYWORD): Result {
    const rgb = Converter.keyword.rgb(keyword);
    if (!rgb) return { filter: null, error: { message: 'Input value for keyword is invalid' } };
    return CssFilterConverter.convertToFilter(rgb);
  }

  // WORK - regex validator
  public static async filterToRgb(): Promise<string> {
    return FilterToColor.generate(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }
}

// CssFilterConverter.filterToRgb().then((result) => console.log(result));
console.log(CssFilterConverter.keywordToFilter('blue' as unknown as 'red'));
