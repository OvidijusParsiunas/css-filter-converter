import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ColorConversionTypes, ColorToConverter } from '../../../../../../shared/types/basicColorFactory';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { KEYWORD } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class KeywordBasicColor extends BasicColor {
  protected _colorType: BasicColorTypes = BasicColorTypes.KEYWORD;

  protected _defaultColorString: KEYWORD = 'lightskyblue';

  protected _inputColorString: KEYWORD = this._defaultColorString;

  protected _validCssColorString = this._inputColorString;

  protected _parseResult: KEYWORD = this._inputColorString;

  private static readonly KEYWORD_TO_COLOR: ColorToConverter<KEYWORD> = {
    [BasicColorTypes.HEX]: ColorConvert.keyword.hex,
    [BasicColorTypes.RGB]: ColorConvert.keyword.rgb,
    [BasicColorTypes.HSL]: ColorConvert.keyword.hsl,
  };

  // eslint-disable-next-line class-methods-use-this
  protected parse(processedInputColorString: string): ParseResult<KEYWORD> {
    return ColorParser.validateAndParseKeyword(processedInputColorString);
  }

  protected setValicCssColorStringUsingParsedResult(): void {
    this._validCssColorString = this._parseResult;
  }

  protected convert(newColorType: BasicColorTypes): ColorConversionTypes {
    const converter = KeywordBasicColor.KEYWORD_TO_COLOR[newColorType];
    if (converter) return converter(this._parseResult);
    throw new Error(`Failed conversion from ${BasicColorTypes.KEYWORD} to ${newColorType} using: ${this._parseResult}`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: KEYWORD): string {
    return conversionResult;
  }
}
