import { HSL, RGB } from 'color-convert/conversions';

export type ParseAndValidateResult<T> = {
  result?: T;
  errorMessage?: string;
};

export class RgbColorParser {
  private static createErrorMessage(colorString: string, format: string): string {
    return `Input color string could not be parsed. Expected format: ${format}. String received: ${colorString}.`;
  }

  private static readonly MATCH_INTEGER_AND_FLOAT_NUMBERS = /(\d+(?:\.\d+)?)/g;

  public static parseAndValidateHex(hexString: string): ParseAndValidateResult<string> {
    // const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    // return shorthandHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const hexRegex = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;
    const result = hexString.match(hexRegex);
    if (!result) return { errorMessage: 'error' };
    return { result: hexString };
  }

  private static getFirstThreeNumbersFromString(color: string): RGB | HSL | null {
    if (color.length < 20) {
      const regexResult = color.match(RgbColorParser.MATCH_INTEGER_AND_FLOAT_NUMBERS);
      if (regexResult && regexResult.length >= 3) {
        return regexResult.slice(0, 3).map((numberString) => Number.parseInt(numberString)) as RGB | HSL;
      }
    }
    return null;
  }

  public static parseAndValidateRGB(rgbString: string): ParseAndValidateResult<RGB> {
    const rgb = RgbColorParser.getFirstThreeNumbersFromString(rgbString);
    if (rgb && rgb[0] < 256 && rgb[1] < 256 && rgb[2] < 256) {
      return { result: rgb };
    }
    return { errorMessage: 'error' };
  }

  public static parseAndValidateHSL(hslString: string): ParseAndValidateResult<HSL> {
    const hsl = RgbColorParser.getFirstThreeNumbersFromString(hslString);
    if (hsl && hsl[0] < 361 && hsl[1] < 101 && hsl[2] < 101) {
      return { result: hsl };
    }
    return { errorMessage: 'error' };
  }
}
