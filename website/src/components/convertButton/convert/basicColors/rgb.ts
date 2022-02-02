import { ColorToConverter, ConversionResult, PossibleReturnColors } from '../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { RGB } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class RGBBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.RGB;

  private static readonly RGB_TO_COLOR: ColorToConverter<RGB> = {
    [BasicColorTypes.HEX]: ColorConvert.rgb.hex,
    [BasicColorTypes.HSL]: ColorConvert.rgb.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.rgb.keyword,
  };

  protected parse(): ParseResult<RGB> {
    return ColorParser.validateAndParseRgb(this.colorString);
  }

  protected convert(parseResult: RGB): ConversionResult {
    const converter = RGBBasicColor.RGB_TO_COLOR[this.newColor.colorType];
    if (converter) return converter(parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(result: PossibleReturnColors): string {
    return `rgb(${result.toString()})`;
  }
}
