import { BASIC_COLOR_TYPE_STRING } from '../types/colorTypeString';
import { BASIC_COLOR_TYPES } from '../consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';
import { KEYWORD } from '../consts/importsAliases';

export class ColorToFilter {
  private static readonly COLOR_TYPE_TO_STRING_CONVERTER = {
    [BASIC_COLOR_TYPES.HEX]: CssFilterConverter.hexToFilter,
    [BASIC_COLOR_TYPES.RGB]: CssFilterConverter.rgbToFilter,
    [BASIC_COLOR_TYPES.HSL]: CssFilterConverter.hslToFilter,
  };

  private static readonly COLOR_TYPE_TO_KEYWORD_CONVERTER = {
    [BASIC_COLOR_TYPES.KEYWORD]: CssFilterConverter.keywordToFilter,
  };

  // deal with null checks
  public static convert(inputColor: string | KEYWORD, colorType: BASIC_COLOR_TYPE_STRING): string {
    if (colorType === BASIC_COLOR_TYPES.KEYWORD) {
      return ColorToFilter.COLOR_TYPE_TO_KEYWORD_CONVERTER[colorType](inputColor as KEYWORD).color as string;
    }
    return ColorToFilter.COLOR_TYPE_TO_STRING_CONVERTER[colorType](inputColor).color as string;
  }
}
