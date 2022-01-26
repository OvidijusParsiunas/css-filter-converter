import { FilterToColorBrowser } from './platforms/browser';

export class FilterToColor {
  public static async generate(filter: string): Promise<string> {
    if (typeof window === 'undefined') {
      const { FilterToColorNode } = await import('./platforms/node');
      return FilterToColorNode.generate(filter);
    }
    return FilterToColorBrowser.generate(filter);
  }
}
