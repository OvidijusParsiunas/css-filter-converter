import { ColorParser, ParseResult } from 'css-filter-converter/lib/colorToFilter/colorParser/colorParser';
import { ErrorHandling } from 'css-filter-converter/lib/shared/errorHandling/errorHandling';
import { BasicColorTypes } from '../../../../../shared/consts/colorTypes';
import { HEX, HSL, KEYWORD, RGB } from 'color-convert/conversions';
import ColorConvert from 'color-convert';

type PossibleReturnColors = RGB | HEX | HSL | KEYWORD;

type ConversionResult = PossibleReturnColors | 'error';

type ColorPrefix = { [key in BasicColorTypes]?: string };

type ColorToConverter<T> = { [key in BasicColorTypes]?: (color: T) => PossibleReturnColors };

type Parser<T = PossibleReturnColors> = (rgbString: string) => ParseResult<T>;

type Converter<T> = (color: T) => PossibleReturnColors;

export class ColorToColor {
  private static readonly COLOR_PREFIX: ColorPrefix = {
    [BasicColorTypes.HEX]: '#',
    [BasicColorTypes.RGB]: 'rgb(',
    [BasicColorTypes.HSL]: 'hsl(',
  };

  private static readonly COLOR_POSTFIX: ColorPrefix = {
    [BasicColorTypes.RGB]: ')',
    [BasicColorTypes.HSL]: ')',
  };

  private static readonly HEX_TO_COLOR: ColorToConverter<string> = {
    [BasicColorTypes.RGB]: ColorConvert.hex.rgb,
    [BasicColorTypes.HSL]: ColorConvert.hex.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.hex.keyword,
  };

  private static readonly RGB_TO_COLOR: ColorToConverter<RGB> = {
    [BasicColorTypes.HEX]: ColorConvert.rgb.hex,
    [BasicColorTypes.HSL]: ColorConvert.rgb.hsl,
    [BasicColorTypes.KEYWORD]: ColorConvert.rgb.keyword,
  };

  private static readonly HSL_TO_COLOR: ColorToConverter<HSL> = {
    [BasicColorTypes.HEX]: ColorConvert.hsl.hex,
    [BasicColorTypes.RGB]: ColorConvert.hsl.rgb,
    [BasicColorTypes.KEYWORD]: ColorConvert.hsl.keyword,
  };

  private static readonly KEYWORD_TO_COLOR: ColorToConverter<KEYWORD> = {
    [BasicColorTypes.HEX]: ColorConvert.keyword.hex,
    [BasicColorTypes.RGB]: ColorConvert.keyword.rgb,
    [BasicColorTypes.HSL]: ColorConvert.keyword.hsl,
  };

  private static processResult(newType: BasicColorTypes, result: PossibleReturnColors): string {
    if (newType === BasicColorTypes.HSL) {
      result = `${result[0]}deg, ${result[1]}%, ${result[2]}%`;
    } else {
      result = result.toString();
    }
    const prefix = ColorToColor.COLOR_PREFIX[newType];
    if (prefix) result = `${prefix}${result}`;
    const psstfix = ColorToColor.COLOR_POSTFIX[newType];
    if (psstfix) result = `${result}${psstfix}`;
    return result;
  }

  private static execute<T>(color: string, converter?: Converter<T>, parser?: Parser<T>): ConversionResult {
    const parseResult = parser ? parser(color) : { color };
    if (ErrorHandling.hasError(parseResult)) return 'error';
    if (converter) {
      const result = converter(parseResult.color as T);
      if (result) return result;
    }
    return 'error';
  }

  private static convertOldToNew(color: string, oldType: BasicColorTypes, newType: BasicColorTypes): PossibleReturnColors {
    if (oldType === BasicColorTypes.HEX) {
      return ColorToColor.execute<string>(color, ColorToColor.HEX_TO_COLOR[newType], ColorParser.validateAndParseHex);
    }
    if (oldType === BasicColorTypes.HSL) {
      return ColorToColor.execute<HSL>(color, ColorToColor.HSL_TO_COLOR[newType], ColorParser.validateAndParseHsl);
    }
    if (oldType === BasicColorTypes.RGB) {
      return ColorToColor.execute<RGB>(color, ColorToColor.RGB_TO_COLOR[newType], ColorParser.validateAndParseRgb);
    }
    return ColorToColor.execute<KEYWORD>(color, ColorToColor.KEYWORD_TO_COLOR[newType]);
  }

  public static convert(color: string, oldType: BasicColorTypes, newType: BasicColorTypes): string {
    const result = ColorToColor.convertOldToNew(color, oldType, newType);
    return ColorToColor.processResult(newType, result);
  }
}
