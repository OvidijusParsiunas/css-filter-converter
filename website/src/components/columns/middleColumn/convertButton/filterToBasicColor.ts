import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { FilterToColorResult } from 'css-filter-converter/lib/shared/types/result';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';
import { RGB } from 'color-convert/conversions';

export class FilterToBasicColor {
  private static readonly FILTER_TO_BASIC_COLOR_CONVERTER = {
    [BasicColorTypes.HEX]: CssFilterConverter.filterToHex,
    [BasicColorTypes.RGB]: CssFilterConverter.filterToRgb,
    [BasicColorTypes.HSL]: CssFilterConverter.filterToHsl,
  };

  private static processResult(result: string | RGB, resultBasicColorType: FilterToColorResultType): string {
    if (resultBasicColorType === BasicColorTypes.RGB) {
      return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    }
    if (resultBasicColorType === BasicColorTypes.HSL) {
      return `hsl(${result[0]}deg, ${result[1]}%, ${result[2]}%)`;
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
