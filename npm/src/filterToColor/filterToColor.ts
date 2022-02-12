import { FilterToColorResult } from '../shared/types/result';
import { FilterToHex } from './filterToHex/filterToHex';
import Converter from 'color-convert';

export class FilterToColor {
  public static async filterToHex(filterString: string): Promise<FilterToColorResult> {
    const result = await FilterToHex.convert(filterString);
    result.color?.toUpperCase();
    return result;
  }

  public static async filterToRgb(filterString: string): Promise<FilterToColorResult> {
    return FilterToHex.convert(filterString, Converter.hex.rgb);
  }

  public static async filterToHsl(filterString: string): Promise<FilterToColorResult> {
    return FilterToHex.convert(filterString, Converter.hex.hsl);
  }
}
