import { ColorToConverter, ConversionResult, PossibleReturnColors } from '../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HexBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.HEX;

  private static readonly HEX_TO_COLOR: ColorToConverter<string> = {
    [BasicColorTypes.RGB]: ColorConvert.hex.rgb,
    [BasicColorTypes.HSL]: ColorConvert.hex.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.hex.keyword,
  };

  protected parse(): ParseResult<string> {
    return ColorParser.validateAndParseHex(this.colorString);
  }

  protected convert(parseResult: string): ConversionResult {
    const converter = HexBasicColor.HEX_TO_COLOR[this.newColor.colorType];
    if (converter) return converter(parseResult);
    return 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatResult(result: PossibleReturnColors): string {
    return `#${result.toString()}`;
  }
}
