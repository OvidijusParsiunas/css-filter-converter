import { ColorToConverter, ConversionResult } from '../../../../../../shared/types/basicColorFactory';
import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { DEFAULT_VALUES } from '../../../../../../shared/consts/defaultValues';
import { BasicColorTypes } from '../../../../../../shared/consts/colorTypes';
import { ColorResult } from 'css-filter-converter/lib/shared/types/result';
import { BasicColor } from './basicColor';
import ColorConvert from 'color-convert';

export class HexBasicColor extends BasicColor {
  public colorType: BasicColorTypes = BasicColorTypes.HEX;

  public defaultColorString = DEFAULT_VALUES.text;

  public colorString = this.defaultColorString;

  public parseResult = (this.parse() as ColorResult<string>).color as string;

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
  protected formatResult(conversionResult: string): string {
    return `#${conversionResult}`;
  }
}
