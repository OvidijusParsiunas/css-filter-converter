import { FilterToColorOptions } from '../shared/types/options';
import { FilterToColorResult } from '../shared/types/result';
import { HEX, HSL, RGB } from 'color-convert/conversions';
import { FilterToHex } from './filterToHex/filterToHex';
import { HexToColor } from './hexToColor/hexToColor';

export class FilterToColor {
  public static async filterToHex(filterString: string): Promise<FilterToColorResult<HEX>> {
    const result = await FilterToHex.convert<HEX>(filterString);
    if (result.color) result.color = result.color.toUpperCase();
    return result;
  }

  public static async filterToRgb(
    filterString: string,
    options?: FilterToColorOptions,
  ): Promise<FilterToColorResult<RGB | string>> {
    return FilterToHex.convert(filterString, HexToColor.convertToRgb, options);
  }

  public static async filterToHsl(
    filterString: string,
    options?: FilterToColorOptions,
  ): Promise<FilterToColorResult<HSL | string>> {
    return FilterToHex.convert(filterString, HexToColor.convertToHsl, options);
  }
}
