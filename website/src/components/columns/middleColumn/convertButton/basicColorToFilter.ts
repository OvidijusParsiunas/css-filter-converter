import { ColorToFilterResult } from 'css-filter-converter/lib/shared/types/result';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';
import { KEYWORD } from 'color-convert/conversions';

export class BasicColorToFilter {
  private static readonly BASIC_COLOR_TO_FILTER_CONVERTER = {
    [BasicColorTypes.HEX]: CssFilterConverter.hexToFilter,
    [BasicColorTypes.RGB]: CssFilterConverter.rgbToFilter,
    [BasicColorTypes.HSL]: CssFilterConverter.hslToFilter,
  };

  private static readonly KEYWORD_TO_FILTER_CONVERTER = {
    [BasicColorTypes.KEYWORD]: CssFilterConverter.keywordToFilter,
  };

  public static convert(inputColor: string | KEYWORD, colorType: BasicColorTypes, sheen: boolean): ColorToFilterResult {
    if (colorType === BasicColorTypes.KEYWORD) {
      return BasicColorToFilter.KEYWORD_TO_FILTER_CONVERTER[colorType](inputColor as KEYWORD);
    }
    return BasicColorToFilter.BASIC_COLOR_TO_FILTER_CONVERTER[colorType](inputColor, { sheen });
  }
}
