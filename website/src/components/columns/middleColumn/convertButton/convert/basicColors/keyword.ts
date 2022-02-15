import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ColorToConverter, ConversionResult } from '../../../../../../shared/types/basicColorFactory';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { KEYWORD } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class KeywordBasicColor extends BasicColor {
  protected _colorType: BasicColorTypes = BasicColorTypes.KEYWORD;

  protected _defaultColorString: KEYWORD = 'lightskyblue';

  protected _colorString: KEYWORD = this._defaultColorString;

  protected _parseResult: KEYWORD = this._colorString;

  private static readonly KEYWORD_TO_COLOR: ColorToConverter<KEYWORD> = {
    [BasicColorTypes.HEX]: ColorConvert.keyword.hex,
    [BasicColorTypes.RGB]: ColorConvert.keyword.rgb,
    [BasicColorTypes.HSL]: ColorConvert.keyword.hsl,
  };

  protected parse(): ParseResult<KEYWORD> {
    return ColorParser.validateAndParseKeyword(this._colorString);
  }

  protected convert(newColorType: BasicColorTypes): ConversionResult {
    const converter = KeywordBasicColor.KEYWORD_TO_COLOR[newColorType];
    if (converter) return converter(this._parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: KEYWORD): string {
    return conversionResult;
  }
}
