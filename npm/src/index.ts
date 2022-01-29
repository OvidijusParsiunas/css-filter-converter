import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { ColorToFilterResult } from './shared/types/result';
import { KEYWORD } from 'color-convert/conversions';

// NO EXCEPTION - just warnings
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

  // WORK - regex validator
  public static async filterToRgb(): Promise<ColorToFilterResult> {
    return FilterToColor.generate(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }
}

// CssFilterConverter.filterToRgb().then((result) => console.log(result));
console.log(CssFilterConverter.keywordToFilter('blue' as unknown as 'red'));
