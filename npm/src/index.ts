import { FilterCssConverter } from './filterCssConverter/filterCssConverter';

export default class CssFilterConverter {
  public static convert(): string | null {
    return FilterCssConverter.hexToFilter('#ff0000').filter;
  }
}
