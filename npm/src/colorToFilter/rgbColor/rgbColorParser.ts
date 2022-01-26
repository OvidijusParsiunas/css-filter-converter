import { RGB } from 'color-convert/conversions';

export class RgbColorParser {
  private static createErrorMessage(colorString: string, format: string): string {
    return `Input color string could not be parsed. Expected format: ${format}. String received: ${colorString}.`;
  }

  public static validateHex(hex: string): void {
    // const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    // return shorthandHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const hexRegex = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;
    const result = hex.match(hexRegex);
    if (!result) {
      throw new Error('error');
    }
  }

  public static parseAndValidateRGB(hex: string): RGB {
    // rgba and ignore the last value
    // prettier-ignore
    // eslint-disable-next-line max-len
    const hexRegex = /^rgb\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])%?\s*\)$/i;
    const result = hex.match(hexRegex);
    if (!result) {
      throw new Error('error');
    }
    return [Number.parseFloat(result[1]), Number.parseFloat(result[2]), Number.parseFloat(result[3])];
  }

  public static parseAndValidateHSL(hex: string): RGB {
    // prettier-ignore
    // eslint-disable-next-line max-len
    const hexRegex = /^hsl\(\s*(0|[1-9]\d?|[12]\d\d|3[0-5]\d)\s*,\s*((0|[1-9]\d?|100)%)\s*,\s*((0|[1-9]\d?|100)%)\s*\)$/i;
    const result = hex.match(hexRegex);
    if (!result) {
      throw new Error('error');
    }
    return [Number.parseFloat(result[1]), Number.parseFloat(result[2]), Number.parseFloat(result[3])];
  }
}
