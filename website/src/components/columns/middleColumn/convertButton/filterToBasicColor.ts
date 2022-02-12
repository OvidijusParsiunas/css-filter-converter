import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';

export class FilterToBasicColor {
  private static readonly FILTER_TO_BASIC_COLOR_CONVERTER = {
    [BasicColorTypes.HEX]: CssFilterConverter.filterToHex,
    [BasicColorTypes.RGB]: CssFilterConverter.filterToRgb,
    [BasicColorTypes.HSL]: CssFilterConverter.filterToHsl,
  };

  // deal with null values
  public static async convert(filter: string, resultBasicColorType: FilterToColorResultType): Promise<string> {
    const result = await FilterToBasicColor.FILTER_TO_BASIC_COLOR_CONVERTER[resultBasicColorType](filter);
    return result.color || '';
  }
}
