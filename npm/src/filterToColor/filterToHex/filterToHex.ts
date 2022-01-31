import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { FilterToColorResult } from '../../shared/types/result';
import { HEX } from 'color-convert/conversions';
import { FilterToHexBrowser } from './browser';

type Converter<T> = (color: HEX) => T & { toString: () => string };

export class FilterToHex {
  public static async convert<T>(filterString: string, convertFromHex?: Converter<T>): Promise<FilterToColorResult> {
    try {
      let result: FilterToColorResult;
      if (typeof window === 'undefined') {
        const { FilterToHexNode } = await import('./node');
        result = await FilterToHexNode.convert(filterString);
      } else {
        result = await FilterToHexBrowser.convert(filterString);
      }
      if (result.color && convertFromHex) result.color = convertFromHex(result.color).toString();
      return result;
    } catch (error) {
      return ErrorHandling.generateUnexpectedError(error as Error);
    }
  }
}
