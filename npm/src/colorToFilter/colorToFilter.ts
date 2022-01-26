import { RgbColorParser } from './rgbColor/rgbColorParser';
import { RGB, KEYWORD } from 'color-convert/conversions';
import { RgbColor } from './rgbColor/rgbColor';
import { RgbToFilter } from './rgbToFilter';
import * as Converter from 'color-convert';
import { Result } from '../types/result';

export class ColorToFilter {
  private static convertToFilter(rgb: RGB): Result {
    const rgbColor = new RgbColor(rgb);
    const cssGenerator = new RgbToFilter(rgbColor);
    return cssGenerator.convert();
  }

  private static convert<T, E>({
    color,
    validateAndParse,
    convert,
    errorMessage,
  }: {
    color: E;
    validateAndParse?: (color: E) => T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    convert?: any;
    errorMessage?: string;
  }): Result {
    const result = validateAndParse?.(color) || color;
    const rgb = convert?.(result) || [0, 0, 0];
    if (!rgb) return { filter: null, error: { message: errorMessage || 'Input value is invalid' } };
    return ColorToFilter.convertToFilter(rgb);
  }

  public static rgbToFilter(rgb: string): Result {
    return ColorToFilter.convert({ color: rgb, validateAndParse: RgbColorParser.parseAndValidateRGB });
  }

  public static hexToFilter(hex: string): Result {
    return ColorToFilter.convert({
      color: hex,
      validateAndParse: RgbColorParser.parsAndValidateHex,
      convert: Converter.hex.rgb,
    });
  }

  public static hslToFilter(hsl: string): Result {
    return ColorToFilter.convert({
      color: hsl,
      validateAndParse: RgbColorParser.parseAndValidateHSL,
      convert: Converter.hsl.rgb,
    });
  }

  public static keywordToFilter(keyword: KEYWORD): Result {
    return ColorToFilter.convert({
      color: keyword,
      convert: Converter.keyword.rgb,
      errorMessage: 'Input value for keyword is invalid',
    });
  }
}
