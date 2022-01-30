import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { ColorToFilterResult } from './shared/types/result';
import { KEYWORD } from 'color-convert/conversions';

export default class CssFilterConverter {
  public static rgbToFilter(rgb: string): ColorToFilterResult {
    return ColorToFilter.rgbToFilter(rgb);
  }

  public static hexToFilter(hex: string): ColorToFilterResult {
    return ColorToFilter.hexToFilter(hex);
  }

  public static hslToFilter(hsl: string): ColorToFilterResult {
    return ColorToFilter.hslToFilter(hsl);
  }

  public static keywordToFilter(keyword: KEYWORD): ColorToFilterResult {
    return ColorToFilter.keywordToFilter(keyword);
  }

  public static async filterToRgb(filter: string): Promise<ColorToFilterResult> {
    return FilterToColor.filterToRgb(filter);
  }

  public static async filterToHex(filter: string): Promise<ColorToFilterResult> {
    return FilterToColor.filterToHex(filter);
  }

  public static async filterToHsl(filter: string): Promise<ColorToFilterResult> {
    return FilterToColor.filterToHex(filter);
  }
}

module.exports = CssFilterConverter;

// console.log(CssFilterConverter.keywordToFilter('blue' as unknown as 'red'));
// CssFilterConverter.filterToRgb(
//   'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
// ).then((result) => console.log(result));
