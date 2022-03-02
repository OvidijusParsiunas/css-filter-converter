import { MATCH_HEXADECIMAL, MATCH_INTEGER_AND_FLOAT_NUMBERS } from '../../shared/consts/regex';
import { ErrorHandling } from '../../shared/functionality/errorHandling/errorHandling';
import { MAX_COLOR_INPUT_STRING_LENGTH } from '../../shared/consts/inputLimits';
import { ColorFormats } from '../../shared/consts/colorFormats';
import { RGB, HSL, KEYWORD } from 'color-convert/conversions';
import { ColorTypes } from '../../shared/consts/colorTypes';
import { ColorResult } from '../../shared/types/result';
import { Error } from '../../shared/types/error';
// eslint-disable-next-line import/no-extraneous-dependencies
import colors from 'color-name';

export type ParseResult<T> = Error | ColorResult<T>;

export class ColorParser {
  public static validateAndParseHex(hexString: string): ParseResult<string> {
    if (hexString.length < MAX_COLOR_INPUT_STRING_LENGTH) {
      const isValid = hexString.match(MATCH_HEXADECIMAL);
      if (isValid) return { color: hexString };
    }
    return { errorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.HEX, hexString, ColorFormats.HEX) };
  }

  // the reason why this is simply parsing the first three digits instead of the tailored format is because the number
  // of variations of different inputs is very high. E.g. these are valid RGB values:
  // rgb(1,2,3)
  // rgb(1%,2%,3%)
  // rgb(1,2,3,0.5)
  // rgb(1 2 3 / 0.5)
  // rgb(1 2 3 / 50%)
  // Hence because the first three values are always consistent integers and the fourth is irrelevant, it is simpler to
  // parse the first three integers and use them accordingly
  private static parseFirstThreeIntegersFromString<T>(color: string): T | null {
    if (color.length < MAX_COLOR_INPUT_STRING_LENGTH) {
      const regexResult = color.match(MATCH_INTEGER_AND_FLOAT_NUMBERS);
      MATCH_INTEGER_AND_FLOAT_NUMBERS.lastIndex = 0;
      if (regexResult && regexResult.length >= 3) {
        return regexResult.slice(0, 3).map((numberString) => Number.parseInt(numberString)) as unknown as T;
      }
    }
    return null;
  }

  public static validateAndParseRgb(rgbString: string): ParseResult<RGB> {
    const rgb = <RGB>ColorParser.parseFirstThreeIntegersFromString(rgbString);
    if (rgb && rgb[0] <= 255 && rgb[1] <= 255 && rgb[2] <= 255) {
      return { color: rgb };
    }
    return { errorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.RGB, rgbString, ColorFormats.RGB) };
  }

  public static validateAndParseHsl(hslString: string): ParseResult<HSL> {
    const hsl = <HSL>ColorParser.parseFirstThreeIntegersFromString(hslString);
    if (hsl && hsl[0] <= 360 && hsl[1] <= 100 && hsl[2] <= 100) {
      return { color: hsl };
    }
    return { errorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.HSL, hslString, ColorFormats.HSL) };
  }

  public static validateAndParseKeyword(keyword: string): ParseResult<KEYWORD> {
    if (keyword.length < MAX_COLOR_INPUT_STRING_LENGTH) {
      const isValid = colors[keyword as KEYWORD];
      if (isValid) return { color: keyword as KEYWORD };
    }
    return { errorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.KEYWORD, keyword, ColorFormats.KEYWORD) };
  }
}

// There is a unique opportunity to validate the color input when this library operates in the browser
// by creating a new element on the dom and adding the color to it to see if it is valid.
// However it was decided not to use this approach as formats like hsl(1,2,3) are invalid in html elements.
// Additionally, it can also be time consuming to create/find an element, adding color to it and validating
// that color.
