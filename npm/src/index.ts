import { ColorToFilterResult, FilterToColorResult } from './shared/types/result';
import { HEX, HSL, KEYWORD, RGB } from 'color-convert/conversions';
import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { Options } from './shared/types/options';

export default class CssFilterConverter {
  public static rgbToFilter(rgbString: string, options?: Options): ColorToFilterResult {
    return ColorToFilter.rgbToFilter(rgbString, options);
  }

  public static hexToFilter(hexString: string, options?: Options): ColorToFilterResult {
    return ColorToFilter.hexToFilter(hexString, options);
  }

  public static hslToFilter(hslString: string, options?: Options): ColorToFilterResult {
    return ColorToFilter.hslToFilter(hslString, options);
  }

  public static keywordToFilter(keyword: KEYWORD, options?: Options): ColorToFilterResult {
    return ColorToFilter.keywordToFilter(keyword, options);
  }

  public static async filterToRgb(filterString: string): Promise<FilterToColorResult<RGB>> {
    return FilterToColor.filterToRgb(filterString);
  }

  public static async filterToHex(filterString: string): Promise<FilterToColorResult<HEX>> {
    return FilterToColor.filterToHex(filterString);
  }

  public static async filterToHsl(filterString: string): Promise<FilterToColorResult<HSL>> {
    return FilterToColor.filterToHsl(filterString);
  }
}

module.exports = CssFilterConverter;

// console.log(CssFilterConverter.keywordToFilter('blue' as unknown as 'red'));
// CssFilterConverter.filterToRgb(
//   'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
// ).then((result) => console.log(result));
