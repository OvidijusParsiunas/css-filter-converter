import { FilterCssGenerator } from './filterCssGenerator';
import { Color } from './color';

export class FilterCssConverter {
  // WORK - regex validator
  public static hexToFilter(hex: string): string {
    const color = new Color(hex, 'hex');
    const cssGenerator = new FilterCssGenerator(color);
    const result = cssGenerator.generate();
    return result.filter;
  }

  // WORK - regex validator
  public static rgbToFilter(rgb: string): string {
    const color = new Color(rgb, 'rgb');
    const cssGenerator = new FilterCssGenerator(color);
    const result = cssGenerator.generate();
    return result.filter;
  }

  // WORK - regex validator
  public static filterToRgb(filter: string): string {
    return `result${filter}`;
  }
}
