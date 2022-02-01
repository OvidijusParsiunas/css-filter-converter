import {
  ColorParser,
  ParseResult,
} from '../../node_modules/css-filter-converter/lib/colorToFilter/colorParser/colorParser.js';
import { ErrorHandling } from '../../node_modules/css-filter-converter/lib/shared/errorHandling/errorHandling.js';
import { ColorConvert, RGB, HEX, HSL, KEYWORD } from '../consts/importsAliases';
import { BasicColorType } from '../types/colorTypeString';
import { BASIC_COLOR_TYPES } from '../consts/colorTypes';

type PossibleReturnColors = RGB | HEX | HSL | KEYWORD;

type ConversionResult = PossibleReturnColors | 'error';

// eslint-disable-next-line no-unused-vars
type ColorPrefix = { [key in BasicColorType]?: string };

// eslint-disable-next-line no-unused-vars
type ColorToConverter<T> = { [key in BasicColorType]?: (color: T) => PossibleReturnColors };

// eslint-disable-next-line no-unused-vars
type Parser<T = PossibleReturnColors> = (rgbString: string) => ParseResult<T>;

// eslint-disable-next-line no-unused-vars
type Converter<T> = (color: T) => PossibleReturnColors;

export class ColorToColor {
  private static readonly COLOR_PREFIX: ColorPrefix = {
    [BASIC_COLOR_TYPES.HEX]: '#',
    [BASIC_COLOR_TYPES.RGB]: 'rgb(',
    [BASIC_COLOR_TYPES.HSL]: 'hsl(',
  };

  private static readonly COLOR_POSTFIX: ColorPrefix = {
    [BASIC_COLOR_TYPES.RGB]: ')',
    [BASIC_COLOR_TYPES.HSL]: ')',
  };

  private static readonly HEX_TO_COLOR: ColorToConverter<string> = {
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.hex.rgb,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.hex.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.hex.keyword,
  };

  private static readonly RGB_TO_COLOR: ColorToConverter<RGB> = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.rgb.hex,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.rgb.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.rgb.keyword,
  };

  private static readonly HSL_TO_COLOR: ColorToConverter<HSL> = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.hsl.hex,
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.hsl.rgb,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.hsl.keyword,
  };

  private static readonly KEYWORD_TO_COLOR: ColorToConverter<KEYWORD> = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.keyword.hex,
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.keyword.rgb,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.keyword.hsl,
  };

  private static processResult(newType: BasicColorType, result: PossibleReturnColors): string {
    if (newType === BASIC_COLOR_TYPES.HSL) {
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

  private static convertOldToNew(color: string, oldType: BasicColorType, newType: BasicColorType): PossibleReturnColors {
    if (oldType === BASIC_COLOR_TYPES.HEX) {
      return ColorToColor.execute<string>(color, ColorToColor.HEX_TO_COLOR[newType], ColorParser.validateAndParseHex);
    }
    if (oldType === BASIC_COLOR_TYPES.HSL) {
      return ColorToColor.execute<HSL>(color, ColorToColor.HSL_TO_COLOR[newType], ColorParser.validateAndParseHsl);
    }
    if (oldType === BASIC_COLOR_TYPES.RGB) {
      return ColorToColor.execute<RGB>(color, ColorToColor.RGB_TO_COLOR[newType], ColorParser.validateAndParseRgb);
    }
    return ColorToColor.execute<KEYWORD>(color, ColorToColor.KEYWORD_TO_COLOR[newType]);
  }

  public static convert(color: string, oldType: BasicColorType, newType: BasicColorType): string {
    const result = ColorToColor.convertOldToNew(color, oldType, newType);
    return ColorToColor.processResult(newType, result);
  }
}
