import { ColorConvert, RGB, HEX, HSL, KEYWORD } from '../consts/importsAliases';
import { BASIC_COLOR_TYPE_STRING } from '../types/colorTypeString';
import { BASIC_COLOR_TYPES } from '../consts/colorTypes';
import { ELEMENT_IDS } from '../consts/elementIds';

type POSSIBLE_RETURN_COLORS = RGB | HEX | HSL | KEYWORD;

type CONVERSION_RESULT = POSSIBLE_RETURN_COLORS | 'error';

// eslint-disable-next-line no-unused-vars
type COLOR_PREFIX = { [key in BASIC_COLOR_TYPE_STRING]?: string };

// eslint-disable-next-line no-unused-vars
type COLOR_TO_COLOR<T> = { [key in BASIC_COLOR_TYPE_STRING]?: (color: T) => POSSIBLE_RETURN_COLORS };

export class ColorToColor {
  private static readonly COLOR_PREFIX: COLOR_PREFIX = {
    [BASIC_COLOR_TYPES.HEX]: '#',
    [BASIC_COLOR_TYPES.RGB]: 'rgb(',
    [BASIC_COLOR_TYPES.HSL]: 'hsl(',
  };

  private static readonly COLOR_POSTFIX: COLOR_PREFIX = {
    [BASIC_COLOR_TYPES.RGB]: ')',
    [BASIC_COLOR_TYPES.HSL]: ')',
  };

  private static readonly HEX_TO_COLOR: COLOR_TO_COLOR<string> = {
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.hex.rgb,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.hex.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.hex.keyword,
  };

  private static readonly RGB_TO_COLOR: COLOR_TO_COLOR<RGB> = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.rgb.hex,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.rgb.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.rgb.keyword,
  };

  private static readonly HSL_TO_COLOR: COLOR_TO_COLOR<HSL> = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.hsl.hex,
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.hsl.rgb,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.hsl.keyword,
  };

  private static readonly KEYWORD_TO_COLOR: COLOR_TO_COLOR<KEYWORD> = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.keyword.hex,
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.keyword.rgb,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.keyword.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.keyword.hsl,
  };

  private static parseFirstThreeIntegersFromString<T>(color: string): T | null {
    const MATCH_INTEGER_AND_FLOAT_NUMBERS = /(\d+(?:\.\d+)?)/g;
    const regexResult = color.match(MATCH_INTEGER_AND_FLOAT_NUMBERS);
    MATCH_INTEGER_AND_FLOAT_NUMBERS.lastIndex = 0;
    if (regexResult) {
      return regexResult.slice(0, 3).map((numberString) => Number.parseInt(numberString, 10)) as unknown as T;
    }
    return null;
  }

  private static isColorValid(color: string, testElement: HTMLElement): boolean {
    testElement.style.backgroundColor = '';
    testElement.style.backgroundColor = color;
    return !!testElement.style.backgroundColor;
  }

  private static convertFromRgb(
    newType: BASIC_COLOR_TYPE_STRING,
    color: string,
    testElement: HTMLElement,
  ): CONVERSION_RESULT {
    const isValid = ColorToColor.isColorValid(color, testElement);
    if (!isValid) return 'error';
    const rgb = ColorToColor.parseFirstThreeIntegersFromString<RGB>(color);
    if (rgb) {
      const converter = ColorToColor.RGB_TO_COLOR[newType];
      if (converter) return converter(rgb);
    }
    return 'error';
  }

  private static convertFromHsl(
    newType: BASIC_COLOR_TYPE_STRING,
    color: string,
    testElement: HTMLElement,
  ): CONVERSION_RESULT {
    const isValid = ColorToColor.isColorValid(color, testElement);
    if (!isValid) return 'error';
    const hsl = ColorToColor.parseFirstThreeIntegersFromString<HSL>(color);
    if (hsl) {
      const converter = ColorToColor.HSL_TO_COLOR[newType];
      if (converter) return converter(hsl);
    }
    return 'error';
  }

  private static convertFromHex(
    newType: BASIC_COLOR_TYPE_STRING,
    color: string,
    testElement: HTMLElement,
  ): CONVERSION_RESULT {
    const isValid = ColorToColor.isColorValid(color, testElement);
    if (!isValid) return 'error';
    const converter = ColorToColor.HEX_TO_COLOR[newType];
    if (converter) return converter(color);
    return 'error';
  }

  private static convertFromKeyword(newType: BASIC_COLOR_TYPE_STRING, color: KEYWORD): CONVERSION_RESULT {
    const converter = ColorToColor.KEYWORD_TO_COLOR[newType];
    if (converter) {
      const result = converter(color);
      if (result) return result;
    }
    return 'error';
  }

  public static convert(oldType: BASIC_COLOR_TYPE_STRING, newType: BASIC_COLOR_TYPE_STRING, color: string): string {
    let testElement = document.getElementById(ELEMENT_IDS.COLOR_VALIDATION_ELEMENT);
    if (!testElement) testElement = document.createElement('div');
    let result: CONVERSION_RESULT = '';
    if (oldType === BASIC_COLOR_TYPES.HEX) result = ColorToColor.convertFromHex(newType, color, testElement);
    if (oldType === BASIC_COLOR_TYPES.RGB) result = ColorToColor.convertFromRgb(newType, color, testElement);
    if (oldType === BASIC_COLOR_TYPES.HSL) result = ColorToColor.convertFromHsl(newType, color, testElement);
    if (oldType === BASIC_COLOR_TYPES.KEYWORD) result = ColorToColor.convertFromKeyword(newType, color as KEYWORD);
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
