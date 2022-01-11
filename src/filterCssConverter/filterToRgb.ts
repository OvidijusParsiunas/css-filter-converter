export class FilterToRgb {
  public static convert(): string {
    // no bearing
    // brightness(0)
    // saturate(100%)

    // dynamic
    // invert(${FilterCssGenerator.fmt(filters, 0)}%)
    // sepia(${FilterCssGenerator.fmt(filters, 1)}%)
    // saturate(${FilterCssGenerator.fmt(filters, 2)}%)
    // hue-rotate(${FilterCssGenerator.fmt(filters, 3, 3.6)}deg)
    // brightness(${FilterCssGenerator.fmt(filters, 4)}%)
    // contrast(${FilterCssGenerator.fmt(filters, 5)}%)

    // fmt
    // 8.2 * 1 = 8.2 = 8         ->     8 / 1 = 8
    // 8.2 & 3.6 = 29.52 = 30    ->     30 / 3.6 = 8.3333
    // return Math.round(filters[idx] * multiplier); -> filters[idx] / multiplier
    // max precision loss is 0.5
    return 'hello';
  }
}
