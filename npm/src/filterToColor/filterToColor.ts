import { FilterToColorResult } from '../shared/types/result';
import { HEX, HSL, RGB } from 'color-convert/conversions';
import { FilterToHex } from './filterToHex/filterToHex';
import Converter from 'color-convert';

export class FilterToColor {
  public static async filterToHex(filterString: string): Promise<FilterToColorResult<HEX>> {
    const result = await FilterToHex.convert<HEX>(filterString);
    if (result.color) result.color = result.color.toUpperCase();
    return result;
  }

  public static async filterToRgb(filterString: string): Promise<FilterToColorResult<RGB>> {
    return FilterToHex.convert(filterString, Converter.hex.rgb);
  }

  public static async filterToHsl(filterString: string): Promise<FilterToColorResult<HSL>> {
    return FilterToHex.convert(filterString, Converter.hex.hsl);
  }
}
