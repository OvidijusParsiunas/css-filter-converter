import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { ColorToFilterResult } from './shared/types/result';
import { KEYWORD } from 'color-convert/conversions';

export default class CssFilterConverter {
  public static rgbToFilter(rgbString: string): ColorToFilterResult {
    return ColorToFilter.rgbToFilter(rgbString);
  }

  public static hexToFilter(hexString: string): ColorToFilterResult {
    return ColorToFilter.hexToFilter(hexString);
  }

  public static hslToFilter(hslString: string): ColorToFilterResult {
    return ColorToFilter.hslToFilter(hslString);
  }

  public static keywordToFilter(keyword: KEYWORD): ColorToFilterResult {
    return ColorToFilter.keywordToFilter(keyword);
  }

  public static async filterToRgb(filterString: string): Promise<ColorToFilterResult> {
    return FilterToColor.filterToRgb(filterString);
  }

  public static async filterToHex(filterString: string): Promise<ColorToFilterResult> {
    return FilterToColor.filterToHex(filterString);
  }

  public static async filterToHsl(filterString: string): Promise<ColorToFilterResult> {
    return FilterToColor.filterToHex(filterString);
  }
}

module.exports = CssFilterConverter;

// console.log(CssFilterConverter.keywordToFilter('blue' as unknown as 'red'));
// CssFilterConverter.filterToRgb(
//   'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
// ).then((result) => console.log(result));
