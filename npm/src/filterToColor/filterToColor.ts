import { FilterToColorBrowser } from './browser';

export class FilterToColor {
  public static async generate(): Promise<string | null> {
    if (typeof window === 'undefined') {
      const { FilterToColorNode } = await import('./node');
      return FilterToColorNode.generate(
        'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
      );
    }
    return FilterToColorBrowser.generate(
      'invert(38%) sepia(78%) saturate(2066%) hue-rotate(166deg) brightness(102%) contrast(101%)',
    );
  }
}
