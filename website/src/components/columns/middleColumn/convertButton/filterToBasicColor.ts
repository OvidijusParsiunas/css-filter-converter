import { FilterToColorResultType } from '../../../../shared/types/filterToBasicColor';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import CssFilterConverter from 'css-filter-converter';
import { RGB } from 'color-convert/conversions';

export class FilterToBasicColor {
  private static readonly FILTER_TO_BASIC_COLOR_CONVERTER = {
    [BasicColorTypes.HEX]: CssFilterConverter.filterToHex,
    [BasicColorTypes.RGB]: CssFilterConverter.filterToRgb,
    [BasicColorTypes.HSL]: CssFilterConverter.filterToHsl,
  };

  private static processResult(result: string | RGB | null, resultBasicColorType: FilterToColorResultType): string {
    if (!result) return '';
    if (resultBasicColorType === BasicColorTypes.RGB) {
      return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    }
    if (resultBasicColorType === BasicColorTypes.HSL) {
      return `hsl(${result[0]}deg, ${result[1]}%, ${result[2]}%)`;
    }
    return result as string;
  }

  // WORK deal with null values
  public static async convert(filter: string, resultBasicColorType: FilterToColorResultType): Promise<string> {
    const result = await FilterToBasicColor.FILTER_TO_BASIC_COLOR_CONVERTER[resultBasicColorType](filter);
    return FilterToBasicColor.processResult(result.color, resultBasicColorType);
  }
}
