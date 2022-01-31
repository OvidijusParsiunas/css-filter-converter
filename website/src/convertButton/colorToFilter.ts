import { BASIC_COLOR_TYPE_STRING } from '../types/colorTypeString';
import { BASIC_COLOR_TYPES } from '../consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';

export class ColorToFilter {
  private static readonly COLOR_TYPE_TO_CONVERTER = {
    [BASIC_COLOR_TYPES.HEX]: CssFilterConverter.hexToFilter,
    [BASIC_COLOR_TYPES.RGB]: CssFilterConverter.rgbToFilter,
    [BASIC_COLOR_TYPES.HSL]: CssFilterConverter.hslToFilter,
    [BASIC_COLOR_TYPES.KEYWORD]: CssFilterConverter.keywordToFilter,
  };

  public static convert(inputColor: string, colorType: BASIC_COLOR_TYPE_STRING): string {
    const converter = ColorToFilter.COLOR_TYPE_TO_CONVERTER[colorType];
    const result = converter(inputColor);
    return result.color as string;
  }
}
