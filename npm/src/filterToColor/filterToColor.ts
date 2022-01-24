export class FilterToColor {
  public static async generate(): Promise<string | null> {
    if (typeof window === 'undefined') {
      return import('./node').then((module) => {
        const { FilterToColorNode } = module;
        return FilterToColorNode.generate();
      });
    }
    return new Promise((resolve) => resolve('mock'));
  }
}
