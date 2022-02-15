import { ColorToConverter, ConversionResult } from '../../../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { ColorResult } from 'css-filter-converter/lib/shared/types/result';
import { RGB } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class RGBBasicColor extends BasicColor {
  protected _colorType: BasicColorTypes = BasicColorTypes.RGB;

  protected _defaultColorString = 'rgb(133, 205, 250)';

  protected _colorString = this._defaultColorString;

  protected _parseResult = (this.parse() as ColorResult<RGB>).color as RGB;

  private static readonly RGB_TO_COLOR: ColorToConverter<RGB> = {
    [BasicColorTypes.HEX]: ColorConvert.rgb.hex,
    [BasicColorTypes.HSL]: ColorConvert.rgb.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.rgb.keyword,
  };

  protected parse(): ParseResult<RGB> {
    return ColorParser.validateAndParseRgb(this._colorString);
  }

  protected convert(newColorType: BasicColorTypes): ConversionResult {
    const converter = RGBBasicColor.RGB_TO_COLOR[newColorType];
    if (converter) return converter(this._parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: RGB): string {
    return `rgb(${conversionResult.join(', ')})`;
  }
}
