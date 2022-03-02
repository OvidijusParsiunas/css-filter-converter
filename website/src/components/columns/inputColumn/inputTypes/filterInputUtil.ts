export class FilterInputUtil {
  private static readonly filterTestElement = document.createElement('div');

  public static parse(filterInputString: string): { filter: string; isValid: boolean } {
    const { style } = FilterInputUtil.filterTestElement;
    style.filter = '';
    style.filter = filterInputString;
    return { filter: style.filter, isValid: !!style.filter };
  }
}
