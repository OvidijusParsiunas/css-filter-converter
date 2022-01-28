import { ColorToFilter } from './colorToFilter/colorToFilter';
import { FilterToColor } from './filterToColor/filterToColor';
import { KEYWORD } from 'color-convert/conversions';
import { Result } from './shared/types/result';

// NO EXCEPTION - just warnings
export default class CssFilterConverter {
  public static rgbToFilter(rgb: string): Result {
    return ColorToFilter.rgbToFilter(rgb);
  }

  public static hexToFilter(hex: string): Result {
    return ColorToFilter.hexToFilter(hex);
  }

  public static hslToFilter(hsl: string): Result {
    return ColorToFilter.hslToFilter(hsl);
  }

  public static keywordToFilter(keyword: KEYWORD): Result {
    return ColorToFilter.keywordToFilter(keyword);
  }

  // WORK - regex validator
  public static async filterToRgb(): Promise<string> {
    return FilterToColor.generate(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }
}

// CssFilterConverter.filterToRgb().then((result) => console.log(result));
console.log(CssFilterConverter.keywordToFilter('blue' as unknown as 'red'));
