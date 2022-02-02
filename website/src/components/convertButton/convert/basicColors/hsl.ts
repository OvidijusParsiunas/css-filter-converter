import { ColorToConverter, ConversionResult, ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { HSL } from 'color-convert/conversions';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HSLBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.HSL;

  public colorString = 'hsl(240deg 79% 57%)';

  public parseResult: HSL = [240, 79, 57];

  private static readonly HSL_TO_COLOR: ColorToConverter<HSL> = {
    [BasicColorTypes.HEX]: ColorConvert.hsl.hex,
    [BasicColorTypes.RGB]: ColorConvert.hsl.rgb,
    [BasicColorTypes.KEYWORD]: ColorConvert.hsl.keyword,
  };

  protected parse(): ParseResult<HSL> {
    return ColorParser.validateAndParseHsl(this.colorString);
  }

  protected convert(newColorType: BasicColorTypes): ConversionResult {
    const converter = HSLBasicColor.HSL_TO_COLOR[newColorType];
    if (converter) return converter(this.parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: ColorConversionTypes): string {
    return `hsl(${conversionResult[0]}deg, ${conversionResult[1]}%, ${conversionResult[2]}%)`;
  }
}
