import { ErrorHandling } from '../shared/functionality/errorHandling/errorHandling';
import { SheenUtil } from '../shared/functionality/sheen/sheenUtil';
import { ColorToFilterOptions } from '../shared/types/options';
import { ColorToFilterResult } from '../shared/types/result';
import { ColorTypes } from '../shared/consts/colorTypes';
import { RgbToFilter } from './rgbToFilter/rgbToFilter';
import { ColorParser } from './colorParser/colorParser';
import { KEYWORD } from 'color-convert/conversions';
import Converter from 'color-convert';

export class ColorToFilter {
  public static rgbToFilter(rgbString: string, options?: ColorToFilterOptions): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: rgbString,
      validateAndParse: ColorParser.validateAndParseRgb,
      addSheen: SheenUtil.parseSheenFromOptions(options),
    });
  }

  public static hexToFilter(hexString: string, options?: ColorToFilterOptions): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: hexString,
      validateAndParse: ColorParser.validateAndParseHex,
      convertToRgb: Converter.hex.rgb,
      addSheen: SheenUtil.parseSheenFromOptions(options),
    });
  }

  public static hslToFilter(hslString: string, options?: ColorToFilterOptions): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: hslString,
      validateAndParse: ColorParser.validateAndParseHsl,
      convertToRgb: Converter.hsl.rgb,
      addSheen: SheenUtil.parseSheenFromOptions(options),
    });
  }

  public static keywordToFilter(keyword: KEYWORD, options?: ColorToFilterOptions): ColorToFilterResult {
    return RgbToFilter.convert({
      colorString: keyword,
      validateAndParse: ColorParser.validateAndParseKeyword,
      convertToRgb: Converter.keyword.rgb,
      conversionErrorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.KEYWORD, keyword),
      addSheen: SheenUtil.parseSheenFromOptions(options),
    });
  }
}
