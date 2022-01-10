import { CssGenerator } from './cssGenerator';
import { Color } from './color';

export class FilterColorGenerator {
  public static generate(hex: string): string {
    const color = new Color(hex, 'hex');
    const cssGenerator = new CssGenerator(color);
    const result = cssGenerator.generate();
    return result.filter;
  }
}
