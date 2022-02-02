import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { HEX, HSL, KEYWORD, RGB } from 'color-convert/conversions';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

type PossibleReturnColors = RGB | HEX | HSL | KEYWORD;

type ColorToConverter<T> = { [key in BasicColorTypes]?: (color: T) => PossibleReturnColors };

type ConversionResult = PossibleReturnColors | 'error';

export class KeywordBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.KEYWORD;

  private static readonly KEYWORD_TO_COLOR: ColorToConverter<KEYWORD> = {
    [BasicColorTypes.HEX]: ColorConvert.keyword.hex,
    [BasicColorTypes.RGB]: ColorConvert.keyword.rgb,
    [BasicColorTypes.HSL]: ColorConvert.keyword.hsl,
  };

  protected parse(): ParseResult<KEYWORD> {
    return { color: this.colorString as KEYWORD };
  }

  protected convert(parseResult: KEYWORD): ConversionResult {
    const converter = KeywordBasicColor.KEYWORD_TO_COLOR[this.newType];
    if (converter) return converter(parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatTargetString(result: PossibleReturnColors): string {
    return result.toString();
  }
}
