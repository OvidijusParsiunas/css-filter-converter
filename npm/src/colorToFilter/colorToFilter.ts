import { ErrorHandling } from '../shared/errorHandling/errorHandling';
import { ColorToFilterResult } from '../shared/types/result';
import { RgbColorParser } from './rgbColor/rgbColorParser';
import { ColorTypes } from '../shared/consts/colorTypes';
import { RgbToFilter } from './rgbToFilter/rgbToFilter';
import { KEYWORD } from 'color-convert/conversions';
import * as Converter from 'color-convert';

export class ColorToFilter {
  public static rgbToFilter(rgb: string): ColorToFilterResult {
    return RgbToFilter.convert({
      color: rgb,
      validateAndParse: RgbColorParser.parseAndValidateRGB,
    });
  }

  public static hexToFilter(hex: string): ColorToFilterResult {
    return RgbToFilter.convert({
      color: hex,
      validateAndParse: RgbColorParser.parseAndValidateHex,
      convertToRgb: Converter.hex.rgb,
    });
  }

  public static hslToFilter(hsl: string): ColorToFilterResult {
    return RgbToFilter.convert({
      color: hsl,
      validateAndParse: RgbColorParser.parseAndValidateHSL,
      convertToRgb: Converter.hsl.rgb,
    });
  }

  public static keywordToFilter(keyword: KEYWORD): ColorToFilterResult {
    return RgbToFilter.convert({
      color: keyword,
      convertToRgb: Converter.keyword.rgb,
      conversionErrorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.KEYWORD, keyword),
    });
  }
}
