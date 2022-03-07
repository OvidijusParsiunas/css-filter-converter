import { ColorFormatter } from 'css-filter-converter/lib/shared/functionality/colorFormatter/colorFormatter';
import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { FilterToColorResult } from 'css-filter-converter/lib/shared/types/result';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';
import { HSL, RGB } from 'color-convert/conversions';

export class FilterToBasicColor {
  private static readonly FILTER_TO_BASIC_COLOR_CONVERTER = {
    [BasicColorTypes.HEX]: CssFilterConverter.filterToHex,
    [BasicColorTypes.RGB]: CssFilterConverter.filterToRgb,
    [BasicColorTypes.HSL]: CssFilterConverter.filterToHsl,
  };

  private static processResult(result: string | RGB, resultBasicColorType: FilterToColorResultType): string {
    if (resultBasicColorType === BasicColorTypes.RGB) {
      return ColorFormatter.arrayToRgbString(result as RGB);
    }
    if (resultBasicColorType === BasicColorTypes.HSL) {
      return ColorFormatter.arrayToHslString(result as HSL);
    }
    return result as string;
  }

  public static async convert(
    filter: string,
    resultBasicColorType: FilterToColorResultType,
  ): Promise<FilterToColorResult<string>> {
    const result = await FilterToBasicColor.FILTER_TO_BASIC_COLOR_CONVERTER[resultBasicColorType](filter);
    if (result.color) result.color = FilterToBasicColor.processResult(result.color, resultBasicColorType);
    return result as FilterToColorResult<string>;
  }
}
