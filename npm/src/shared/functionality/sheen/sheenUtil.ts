import { ColorToFilterOptions } from '../../types/options';

export class SheenUtil {
  public static SHEEN_FILTER_PREFIX = 'brightness(0) saturate(100%)';

  public static parseSheenFromOptions(options?: ColorToFilterOptions): boolean {
    if (options) {
      if (typeof options.sheen === 'boolean') return options.sheen;
    }
    return true;
  }
}
