import { ErrorHandling } from '../../shared/functionality/errorHandling/errorHandling';
import { FilterToColorOptions } from '../../shared/types/options';
import { FilterToColorResult } from '../../shared/types/result';
import { FilterToHexBrowser } from './workers/browser';
import { HEX } from 'color-convert/conversions';

type Converter<T> = (color: HEX, options?: FilterToColorOptions) => T;

export class FilterToHex {
  public static async convert<T>(
    filterString: string,
    convertFromHex?: Converter<T>,
    options?: FilterToColorOptions,
  ): Promise<FilterToColorResult<T>> {
    try {
      let result: FilterToColorResult<T>;
      if (typeof window === 'undefined') {
        console.log('1');
        const { FilterToHexNode } = await import('./workers/node');
        console.log('8');
        result = await FilterToHexNode.convert(filterString);
        console.log(result);
      } else {
        console.log('2');
        result = await FilterToHexBrowser.convert(filterString);
      }
      console.log('3');
      if (result.color && convertFromHex && typeof result.color === 'string') {
        console.log('4');
        result.color = convertFromHex(result.color, options);
      }
      console.log('6');
      console.log(result);
      return result;
    } catch (error) {
      console.log('5');
      return ErrorHandling.generateUnexpectedError(error as Error);
    }
  }
}
