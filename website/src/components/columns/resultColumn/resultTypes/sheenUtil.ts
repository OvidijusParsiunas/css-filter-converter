import { SheenUtil as CssFilterConverterSheenUtil } from 'css-filter-converter/lib/shared/functionality/sheen/sheenUtil';

export class SheenUtil {
  private static readonly SHEEN_FILTER_PREFIX = CssFilterConverterSheenUtil.SHEEN_FILTER_PREFIX;

  private static getStringWithoutSheen(filter: string): string {
    const sheenAndSpaceLength = SheenUtil.SHEEN_FILTER_PREFIX.length + 1;
    return filter.substring(sheenAndSpaceLength, filter.length);
  }

  public static processFilterDependingOnSheenState(isSheenAddedState: boolean, filter: string): string {
    const doesFilterStartWithSheen = filter.startsWith(SheenUtil.SHEEN_FILTER_PREFIX);
    if (!isSheenAddedState && doesFilterStartWithSheen) {
      return SheenUtil.getStringWithoutSheen(filter);
    }
    if (isSheenAddedState && !doesFilterStartWithSheen) {
      return `${SheenUtil.SHEEN_FILTER_PREFIX} ${filter}`;
    }
    return filter;
  }

  public static removeSheen(filter: string): string {
    const doesFilterStartWithSheen = filter.startsWith(SheenUtil.SHEEN_FILTER_PREFIX);
    if (doesFilterStartWithSheen) {
      return SheenUtil.getStringWithoutSheen(filter);
    }
    return filter;
  }
}
