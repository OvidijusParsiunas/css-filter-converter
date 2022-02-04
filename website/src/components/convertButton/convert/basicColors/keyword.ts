import { ColorToConverter, ConversionResult, ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { KEYWORD } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class KeywordBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.KEYWORD;

  protected defaultColorString: KEYWORD = 'lightskyblue';

  public colorString: KEYWORD = this.defaultColorString;

  public parseResult: KEYWORD = this.colorString;

  private static readonly KEYWORD_TO_COLOR: ColorToConverter<KEYWORD> = {
    [BasicColorTypes.HEX]: ColorConvert.keyword.hex,
    [BasicColorTypes.RGB]: ColorConvert.keyword.rgb,
    [BasicColorTypes.HSL]: ColorConvert.keyword.hsl,
  };

  protected parse(): ParseResult<KEYWORD> {
    return { color: this.colorString as KEYWORD };
  }

  protected convert(newColorType: BasicColorTypes): ConversionResult {
    const converter = KeywordBasicColor.KEYWORD_TO_COLOR[newColorType];
    if (converter) return converter(this.parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: ColorConversionTypes): string {
    return conversionResult.toString();
  }
}
