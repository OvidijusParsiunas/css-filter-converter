import { ColorConversionTypes, ColorToConverter } from '../../../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { ColorResult } from 'css-filter-converter/lib/shared/types/result';
import { HSL } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HSLBasicColor extends BasicColor {
  protected _colorType: BasicColorTypes = BasicColorTypes.HSL;

  protected _defaultColorString = 'hsl(203deg, 92%, 75%)';

  protected _inputColorString = this._defaultColorString;

  protected _validCssColorString = this._inputColorString;

  protected _parseResult = (this.parse(this._inputColorString) as ColorResult<HSL>).color as HSL;

  private static readonly HSL_TO_COLOR: ColorToConverter<HSL> = {
    [BasicColorTypes.HEX]: ColorConvert.hsl.hex,
    [BasicColorTypes.RGB]: ColorConvert.hsl.rgb,
    [BasicColorTypes.KEYWORD]: ColorConvert.hsl.keyword,
  };

  // eslint-disable-next-line class-methods-use-this
  protected parse(processedInputColorString: string): ParseResult<HSL> {
    return ColorParser.validateAndParseHsl(processedInputColorString);
  }

  protected setValicCssColorStringUsingParsedResult(): void {
    this._validCssColorString = `hsl(${this._parseResult[0]}deg, ${this._parseResult[1]}%, ${this._parseResult[2]}%)`;
  }

  protected convert(newColorType: BasicColorTypes): ColorConversionTypes {
    const converter = HSLBasicColor.HSL_TO_COLOR[newColorType];
    if (converter) return converter(this._parseResult);
    throw new Error(`Failed conversion from ${BasicColorTypes.HSL} to ${newColorType} using: ${this._parseResult}`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: HSL): string {
    return `hsl(${conversionResult[0]}deg, ${conversionResult[1]}%, ${conversionResult[2]}%)`;
  }
}
