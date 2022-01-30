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

  public static async filterToRgb(): Promise<ColorToFilterResult> {
    return FilterToColor.filterToRgb(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }

  public static async filterToHex(): Promise<ColorToFilterResult> {
    return FilterToColor.filterToHex(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }

  public static async filterToHsl(): Promise<ColorToFilterResult> {
    return FilterToColor.filterToHex(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }
}
