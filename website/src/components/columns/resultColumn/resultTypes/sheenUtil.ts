import { SheenUtil as CssFilterConverterSheenUtil } from 'css-filter-converter/lib/shared/functionality/sheen/sheenUtil';

export class SheenUtil {
  public static processFilterDependingOnSheenState(isSheenAddedState: boolean, filter: string): string {
    const { SHEEN_FILTER_PREFIX } = CssFilterConverterSheenUtil;
    const doesFilterStartWithSheen = filter.startsWith(SHEEN_FILTER_PREFIX);
    if (!isSheenAddedState && doesFilterStartWithSheen) {
      const sheenAndSpaceLength = SHEEN_FILTER_PREFIX.length + 1;
      return filter.substring(sheenAndSpaceLength, filter.length);
    }
    if (isSheenAddedState && !doesFilterStartWithSheen) {
      return `${SHEEN_FILTER_PREFIX} ${filter}`;
    }
    return filter;
  }
}
