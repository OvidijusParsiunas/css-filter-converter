import { FilterToColorResult } from '../shared/types/result';
import { FilterToHex } from './filterToHex/filterToHex';
import * as Converter from 'color-convert';

export class FilterToColor {
  public static async filterToHex(filterString: string): Promise<FilterToColorResult> {
    return FilterToHex.convert(filterString);
  }

  public static async filterToRgb(filterString: string): Promise<FilterToColorResult> {
    return FilterToHex.convert(filterString, Converter.hex.rgb);
  }

  public static async filterToHsl(filterString: string): Promise<FilterToColorResult> {
    return FilterToHex.convert(filterString, Converter.hex.hsl);
  }
}
