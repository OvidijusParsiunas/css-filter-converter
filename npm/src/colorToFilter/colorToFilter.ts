import { RgbToFilterConverter } from './convert/rgbToFilterConverter';
import { RgbColorParser } from './rgbColor/rgbColorParser';
import { KEYWORD } from 'color-convert/conversions';
import { Result } from '../shared/types/result';
import * as Converter from 'color-convert';

export class ColorToFilter {
  public static rgbToFilter(rgb: string): Result {
    return RgbToFilterConverter.convert({ color: rgb, validateAndParse: RgbColorParser.parseAndValidateRGB });
  }

  public static hexToFilter(hex: string): Result {
    return RgbToFilterConverter.convert({
      color: hex,
      validateAndParse: RgbColorParser.parsAndValidateHex,
      convertToRgb: Converter.hex.rgb,
    });
  }

  public static hslToFilter(hsl: string): Result {
    return RgbToFilterConverter.convert({
      color: hsl,
      validateAndParse: RgbColorParser.parseAndValidateHSL,
      convertToRgb: Converter.hsl.rgb,
    });
  }

  public static keywordToFilter(keyword: KEYWORD): Result {
    return RgbToFilterConverter.convert({
      color: keyword,
      convertToRgb: Converter.keyword.rgb,
      invalidInputMessage: 'Input value for keyword is invalid',
    });
  }
}
