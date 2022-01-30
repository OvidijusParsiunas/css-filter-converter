import { FilterToColorResult } from '../shared/types/result';
import { FilterToColorBrowser } from './platforms/browser';
import * as Converter from 'color-convert';

export class FilterToColor {
  private static async generateHex(filterString: string): Promise<FilterToColorResult> {
    if (typeof window === 'undefined') {
      const { FilterToColorNode } = await import('./platforms/node');
      return FilterToColorNode.generate(filterString);
    }
    return FilterToColorBrowser.generate(filterString);
  }

  public static async filterToHex(filterString: string): Promise<FilterToColorResult> {
    return FilterToColor.generateHex(filterString);
  }

  public static async filterToRgb(filterString: string): Promise<FilterToColorResult> {
    const result = await FilterToColor.generateHex(filterString);
    if (result.color) result.color = Converter.hex.rgb(result.color).toString();
    return result;
  }

  public static async filterToHsl(filterString: string): Promise<FilterToColorResult> {
    const result = await FilterToColor.generateHex(filterString);
    if (result.color) result.color = Converter.hex.hsl(result.color).toString();
    return result;
  }
}
