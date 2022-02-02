import { BasicColorTypes } from '../../shared/consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';
import { KEYWORD } from 'color-convert/conversions';

export class ColorToFilter {
  private static readonly COLOR_TYPE_TO_STRING_CONVERTER = {
    [BasicColorTypes.HEX]: CssFilterConverter.hexToFilter,
    [BasicColorTypes.RGB]: CssFilterConverter.rgbToFilter,
    [BasicColorTypes.HSL]: CssFilterConverter.hslToFilter,
  };

  private static readonly COLOR_TYPE_TO_KEYWORD_CONVERTER = {
    [BasicColorTypes.KEYWORD]: CssFilterConverter.keywordToFilter,
  };

  // deal with null checks
  public static convert(inputColor: string | KEYWORD, colorType: BasicColorTypes): string {
    if (colorType === BasicColorTypes.KEYWORD) {
      return ColorToFilter.COLOR_TYPE_TO_KEYWORD_CONVERTER[colorType](inputColor as KEYWORD).color as string;
    }
    return ColorToFilter.COLOR_TYPE_TO_STRING_CONVERTER[colorType](inputColor).color as string;
  }
}
