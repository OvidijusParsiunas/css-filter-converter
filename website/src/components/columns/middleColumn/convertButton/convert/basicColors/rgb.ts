import { ColorConversionTypes, ColorToConverter } from '../../../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { ColorResult } from 'css-filter-converter/lib/shared/types/result';
import { RGB } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class RGBBasicColor extends BasicColor {
  protected _colorType: BasicColorTypes = BasicColorTypes.RGB;

  protected _defaultColorString = 'rgb(133, 205, 250)';

  protected _inputColorString = this._defaultColorString;

  protected _validCssColorString = this._inputColorString;

  protected _parseResult = (this.parse(this._inputColorString) as ColorResult<RGB>).color as RGB;

  private static readonly RGB_TO_COLOR: ColorToConverter<RGB> = {
    [BasicColorTypes.HEX]: ColorConvert.rgb.hex,
    [BasicColorTypes.HSL]: ColorConvert.rgb.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.rgb.keyword,
  };

  // eslint-disable-next-line class-methods-use-this
  protected parse(processedInputColorString: string): ParseResult<RGB> {
    return ColorParser.validateAndParseRgb(processedInputColorString);
  }

  protected setValicCssColorStringUsingParsedResult(): void {
    this._validCssColorString = `rgb(${this._parseResult[0]}, ${this._parseResult[1]}, ${this._parseResult[2]})`;
  }

  protected convert(newColorType: BasicColorTypes): ColorConversionTypes {
    const converter = RGBBasicColor.RGB_TO_COLOR[newColorType];
    if (converter) return converter(this._parseResult);
    throw new Error(`Failed conversion from ${BasicColorTypes.RGB} to ${newColorType} using: ${this._parseResult}`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: RGB): string {
    return `rgb(${conversionResult.join(', ')})`;
  }
}
