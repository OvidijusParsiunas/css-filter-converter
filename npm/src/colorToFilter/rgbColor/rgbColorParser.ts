import { MATCH_HEXADECIMAL, MATCH_INTEGER_AND_FLOAT_NUMBERS } from '../../shared/consts/regex';
import { MAX_COLOR_INPUT_STRING_LENGTH } from '../../shared/consts/inputLimits';
import { ErrorHandling } from '../../shared/errorHandling/errorHandling';
import { ColorFormats } from '../../shared/consts/colorFormats';
import { ColorTypes } from '../../shared/consts/colorTypes';
import { HSL, RGB } from 'color-convert/conversions';

export type ValidateAndParseResult<T> = {
  result?: T;
  errorMessage?: string;
};

export class RgbColorParser {
  public static parseAndValidateHex(hexString: string): ValidateAndParseResult<string> {
    const result = hexString.match(MATCH_HEXADECIMAL);
    if (result) return { result: hexString };
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

  public static parseAndValidateRGB(rgbString: string): ValidateAndParseResult<RGB> {
    const rgb = <RGB>RgbColorParser.parseFirstThreeIntegersFromString(rgbString);
    if (rgb && rgb[0] <= 255 && rgb[1] <= 255 && rgb[2] <= 255) {
      return { result: rgb };
    }
    return { errorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.RGB, rgbString, ColorFormats.RGB) };
  }

  public static parseAndValidateHSL(hslString: string): ValidateAndParseResult<HSL> {
    const hsl = <HSL>RgbColorParser.parseFirstThreeIntegersFromString(hslString);
    if (hsl && hsl[0] <= 360 && hsl[1] <= 100 && hsl[2] <= 100) {
      return { result: hsl };
    }
    return { errorMessage: ErrorHandling.generateInputErrorMessage(ColorTypes.HSL, hslString, ColorFormats.HSL) };
  }
}
