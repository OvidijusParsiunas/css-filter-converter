import { ColorToConverter, ConversionResult, ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { RGB } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class RGBBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.RGB;

  public colorString = 'rgb(60 60 232)';

  public parseResult: RGB = [60, 60, 232];

  private static readonly RGB_TO_COLOR: ColorToConverter<RGB> = {
    [BasicColorTypes.HEX]: ColorConvert.rgb.hex,
    [BasicColorTypes.HSL]: ColorConvert.rgb.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.rgb.keyword,
  };

  protected parse(): ParseResult<RGB> {
    return ColorParser.validateAndParseRgb(this.colorString);
  }

  protected convert(newColorType: BasicColorTypes): ConversionResult {
    const converter = RGBBasicColor.RGB_TO_COLOR[newColorType];
    if (converter) return converter(this.parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: ColorConversionTypes): string {
    return `rgb(${conversionResult.toString()})`;
  }
}
