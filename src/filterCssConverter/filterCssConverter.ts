import { ColorStringTypes } from '../types/colorStringTypes';
import { FilterCssGenerator } from './filterCssGenerator';
import { ErrorHandler } from './errorHandler';
import { Result } from '../types/result';
import { Color } from './color';

export class FilterCssConverter {
  private static convertToFilter(colorString: string, type: ColorStringTypes): Result {
    try {
      const color = new Color(colorString, type);
      const cssGenerator = new FilterCssGenerator(color);
      return cssGenerator.generate();
    } catch (error: unknown) {
      return ErrorHandler.returnErrorResult(error);
    }
  }

  // WORK - regex validator
  public static hexToFilter(hex: string): Result {
    return FilterCssConverter.convertToFilter(hex, 'hex');
  }

  // WORK - regex validator
  public static rgbToFilter(rgb: string): Result {
    return FilterCssConverter.convertToFilter(rgb, 'rgb');
  }

  // WORK - regex validator
  public static filterToRgb(filter: string): string {
    return `result${filter}`;
  }
}
