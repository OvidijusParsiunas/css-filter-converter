import { ColorToFilterOptions, FilterToColorOptions } from './shared/types/options';
import { ColorToFilterResult, FilterToColorResult } from './shared/types/result';
import { HEX, HSL, KEYWORD, RGB } from 'color-convert/conversions';
import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';

export default class CssFilterConverter {
  public static rgbToFilter(rgbString: string, options?: ColorToFilterOptions): ColorToFilterResult {
    return ColorToFilter.rgbToFilter(rgbString, options);
  }

  public static hexToFilter(hexString: string, options?: ColorToFilterOptions): ColorToFilterResult {
    return ColorToFilter.hexToFilter(hexString, options);
  }

  public static hslToFilter(hslString: string, options?: ColorToFilterOptions): ColorToFilterResult {
    return ColorToFilter.hslToFilter(hslString, options);
  }

  public static keywordToFilter(keyword: KEYWORD, options?: ColorToFilterOptions): ColorToFilterResult {
    return ColorToFilter.keywordToFilter(keyword, options);
  }

  public static async filterToHex(filterString: string): Promise<FilterToColorResult<HEX>> {
    return FilterToColor.filterToHex(filterString);
  }

  public static async filterToRgb(
    filterString: string,
    options?: FilterToColorOptions,
  ): Promise<FilterToColorResult<RGB | string>> {
    return FilterToColor.filterToRgb(filterString, options);
  }

  public static async filterToHsl(
    filterString: string,
    options?: FilterToColorOptions,
  ): Promise<FilterToColorResult<HSL | string>> {
    return FilterToColor.filterToHsl(filterString, options);
  }
}

module.exports = CssFilterConverter;

// console.log(CssFilterConverter.keywordToFilter('blue' as unknown as 'red'));
// CssFilterConverter.filterToRgb(
//   'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
// ).then((result) => console.log(result));
