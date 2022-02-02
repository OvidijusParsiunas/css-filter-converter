import { ColorToConverter, ConversionResult, ColorConversionTypes } from '../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HexBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.HEX;

  public colorString = '#3c3ce8';

  public parseResult = '#3c3ce8';

  private static readonly HEX_TO_COLOR: ColorToConverter<string> = {
    [BasicColorTypes.RGB]: ColorConvert.hex.rgb,
    [BasicColorTypes.HSL]: ColorConvert.hex.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.hex.keyword,
  };

  protected parse(): ParseResult<string> {
    return ColorParser.validateAndParseHex(this.colorString);
  }

  protected convert(newColorType: BasicColorTypes): ConversionResult {
    const converter = HexBasicColor.HEX_TO_COLOR[newColorType];
    if (converter) return converter(this.parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(conversionResult: ColorConversionTypes): string {
    return `#${conversionResult.toString()}`;
  }
}
