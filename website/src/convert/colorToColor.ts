import { RgbColorParser } from '../../node_modules/css-filter-converter/lib/colorToFilter/rgbColor/rgbColorParser.js';
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

  private static convertFromRgb(newType: BasicColorType, color: string): ConversionResult {
    const parseResult = RgbColorParser.parseAndValidateRGB(color);
    if (ErrorHandling.hasError(parseResult)) return 'error';
    const converter = ColorToColor.RGB_TO_COLOR[newType];
    if (converter) return converter(parseResult.color);
    return 'error';
  }

  private static convertFromHsl(newType: BasicColorType, color: string): ConversionResult {
    const parseResult = RgbColorParser.parseAndValidateHSL(color);
    if (ErrorHandling.hasError(parseResult)) return 'error';
    const converter = ColorToColor.HSL_TO_COLOR[newType];
    if (converter) return converter(parseResult.color);
    return 'error';
  }

  private static convertFromHex(newType: BasicColorType, color: string): ConversionResult {
    const parseResult = RgbColorParser.parseAndValidateHex(color);
    if (ErrorHandling.hasError(parseResult)) return 'error';
    const converter = ColorToColor.HEX_TO_COLOR[newType];
    if (converter) return converter(color);
    return 'error';
  }

  private static convertFromKeyword(newType: BasicColorType, color: KEYWORD): ConversionResult {
    const converter = ColorToColor.KEYWORD_TO_COLOR[newType];
    if (converter) {
      const result = converter(color);
      if (result) return result;
    }
    return 'error';
  }

  private static getResult(oldType: BasicColorType, newType: BasicColorType, color: string): ConversionResult {
    if (oldType === BASIC_COLOR_TYPES.HEX) return ColorToColor.convertFromHex(newType, color);
    if (oldType === BASIC_COLOR_TYPES.RGB) return ColorToColor.convertFromRgb(newType, color);
    if (oldType === BASIC_COLOR_TYPES.HSL) return ColorToColor.convertFromHsl(newType, color);
    return ColorToColor.convertFromKeyword(newType, color as KEYWORD);
  }

  public static convert(oldType: BasicColorType, newType: BasicColorType, color: string): string {
    let result = ColorToColor.getResult(oldType, newType, color);
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
}
