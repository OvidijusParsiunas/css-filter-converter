import { ErrorHandling } from '../shared/errorHandling/errorHandling';
import { ColorToFilterResult } from '../shared/types/result';
import { ColorTypes } from '../shared/consts/colorTypes';
import { RgbToFilter } from './rgbToFilter/rgbToFilter';
import { ColorParser } from './colorParser/colorParser';
import { KEYWORD } from 'color-convert/conversions';
import Converter from 'color-convert';

export class ColorToFilter {
  public static rgbToFilter(rgbString: string): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: rgbString,
      validateAndParse: ColorParser.validateAndParseRgb,
    });
  }

  public static hexToFilter(hexString: string): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: hexString,
      validateAndParse: ColorParser.validateAndParseHex,
      convertToRgb: Converter.hex.rgb,
    });
  }

  public static hslToFilter(hslString: string): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: hslString,
      validateAndParse: ColorParser.validateAndParseHsl,
      convertToRgb: Converter.hsl.rgb,
    });
  }

  public static keywordToFilter(keyword: KEYWORD): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: keyword,
      validateAndParse: ColorParser.validateAndParseKeyword,
      convertToRgb: Converter.keyword.rgb,
      conversionErrorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.KEYWORD, keyword),
    });
  }
}
