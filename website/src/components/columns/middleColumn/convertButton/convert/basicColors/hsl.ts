import { ColorToConverter, ConversionResult } from '../../../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ColorResult } from 'css-filter-converter/lib/shared/types/result';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { HSL } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HSLBasicColor extends BasicColor {
  protected _colorType: BasicColorTypes = BasicColorTypes.HSL;

  protected _defaultColorString = 'hsl(203deg, 92%, 75%)';

  protected _colorString = this._defaultColorString;

  protected _parseResult = (this.parse() as ColorResult<HSL>).color as HSL;

  private static readonly HSL_TO_COLOR: ColorToConverter<HSL> = {
    [BasicColorTypes.HEX]: ColorConvert.hsl.hex,
    [BasicColorTypes.RGB]: ColorConvert.hsl.rgb,
    [BasicColorTypes.KEYWORD]: ColorConvert.hsl.keyword,
  };

  protected parse(): ParseResult<HSL> {
    return ColorParser.validateAndParseHsl(this._colorString);
  }

  protected convert(newColorType: BasicColorTypes): ConversionResult {
    const converter = HSLBasicColor.HSL_TO_COLOR[newColorType];
    if (converter) return converter(this._parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: HSL): string {
    return `hsl(${conversionResult[0]}deg, ${conversionResult[1]}%, ${conversionResult[2]}%)`;
  }
}
