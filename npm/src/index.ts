import { FilterCssConverter } from './filterCssConverter/filterCssConverter';

export default class CssFilterConverter {
  public static async convert(): Promise<string | null> {
    if (typeof window === 'undefined') {
      return import('./filterToColor/filterToColor').then((module) => {
        const { FilterToColor } = module;
        return FilterToColor.generate();
      });
    }
    return new Promise((resolve) => {
      const result = FilterCssConverter.hexToFilter('#ff0000').filter;
      resolve(result);
    });
  }
}
