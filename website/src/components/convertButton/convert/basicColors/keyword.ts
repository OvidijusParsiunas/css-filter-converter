import { ColorToConverter, ConversionResult, PossibleReturnColors } from '../../../../shared/types/basicColorFactory';
import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { KEYWORD } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

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
    const converter = KeywordBasicColor.KEYWORD_TO_COLOR[this.newColor.colorType];
    if (converter) return converter(parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(result: PossibleReturnColors): string {
    return result.toString();
  }
}
