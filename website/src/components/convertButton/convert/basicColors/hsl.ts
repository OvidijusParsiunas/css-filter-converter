import { ColorToConverter, ConversionResult, PossibleReturnColors } from '../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { HSL } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HSLBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.HSL;

  private static readonly HSL_TO_COLOR: ColorToConverter<HSL> = {
    [BasicColorTypes.HEX]: ColorConvert.hsl.hex,
    [BasicColorTypes.RGB]: ColorConvert.hsl.rgb,
    [BasicColorTypes.KEYWORD]: ColorConvert.hsl.keyword,
  };

  protected parse(): ParseResult<HSL> {
    return ColorParser.validateAndParseHsl(this.colorString);
  }

  protected convert(parseResult: HSL): ConversionResult {
    const converter = HSLBasicColor.HSL_TO_COLOR[this.newColor.colorType];
    if (converter) return converter(parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(result: PossibleReturnColors): string {
    return `hsl(${result[0]}deg, ${result[1]}%, ${result[2]}%)`;
  }
}
