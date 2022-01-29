import { ColorToFilterResult } from '../shared/types/result';
import { FilterToColorBrowser } from './platforms/browser';

export class FilterToColor {
  public static async generate(filterString: string): Promise<ColorToFilterResult> {
    if (typeof window === 'undefined') {
      const { FilterToColorNode } = await import('./platforms/node');
      return FilterToColorNode.generate(filterString);
    }
    return FilterToColorBrowser.generate(filterString);
  }
}
