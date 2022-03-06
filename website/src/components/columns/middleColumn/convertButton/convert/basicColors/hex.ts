import { ColorConversionTypes, ColorToConverter } from '../../../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { DEFAULT_VALUES } from '../../../../../../shared/consts/defaultValues';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { ColorResult } from 'css-filter-converter/lib/shared/types/result';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HexBasicColor extends BasicColor {
  protected _colorType: BasicColorTypes = BasicColorTypes.HEX;

  protected _defaultColorString = DEFAULT_VALUES.text;

  protected _inputColorString = this._defaultColorString;

  protected _validCssColorString = this._inputColorString;

  protected _parseResult = (this.parse(this._inputColorString) as ColorResult<string>).color as string;

  private static readonly HEX_TO_COLOR: ColorToConverter<string> = {
    [BasicColorTypes.RGB]: ColorConvert.hex.rgb,
    [BasicColorTypes.HSL]: ColorConvert.hex.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.hex.keyword,
  };

  // eslint-disable-next-line class-methods-use-this
  protected parse(processedInputColorString: string): ParseResult<string> {
    return ColorParser.validateAndParseHex(processedInputColorString);
  }

  protected setValicCssColorStringUsingParsedResult(): void {
    this._validCssColorString = this._parseResult.trim();
  }

  protected convert(newColorType: BasicColorTypes): ColorConversionTypes {
    const converter = HexBasicColor.HEX_TO_COLOR[newColorType];
    if (converter) return converter(this._parseResult);
    throw new Error(`Failed conversion from ${BasicColorTypes.HEX} to ${newColorType} using: ${this._parseResult}`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: string): string {
    return `#${conversionResult}`;
  }
}
