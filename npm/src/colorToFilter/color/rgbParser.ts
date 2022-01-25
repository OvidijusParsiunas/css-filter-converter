import { ColorStringTypes } from '../../types/colorStringTypes';
import { RGB } from '../../types/RGB';

export class RgbParser {
  private static readonly DECIMAL_RADIX = 10;

  private static readonly HEXADECIMAL_RADIX = 16;

  private static createErrorMessage(colorString: string, format: string): string {
    return `Input color string could not be parsed. Expected format: ${format}. String received: ${colorString}.`;
  }

  private static regExpMatchArrayToRgbNumArr(rgb: string[], radix: number): RGB {
    return { r: parseInt(rgb[1], radix), g: parseInt(rgb[2], radix), b: parseInt(rgb[3], radix) };
  }

  private static buildRgb(fullHex: string): RGB {
    // extract individual hex: #c11a1a -> ['#c11a1a', 'c1', '1a', '1a', ...]
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (result) return RgbParser.regExpMatchArrayToRgbNumArr(result, RgbParser.HEXADECIMAL_RADIX);
    throw new Error(RgbParser.createErrorMessage(fullHex, '#HHH or #HHHHHH where H is hex. E.g. #03F or #0033FF'));
  }

  private static shorthandHexToFullHex(shorthandHex: string): string {
    // Expand shorthand form: #03F -> #0033FF
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    return shorthandHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  }

  private static hexStringToRgb(shorthandHex: string): RGB {
    const fullHex = RgbParser.shorthandHexToFullHex(shorthandHex);
    return RgbParser.buildRgb(fullHex);
  }

  private static rgbStringToRgb(rgb: string): RGB {
    const result = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (result) return RgbParser.regExpMatchArrayToRgbNumArr(result, RgbParser.DECIMAL_RADIX);
    throw new Error(RgbParser.createErrorMessage(rgb, 'rgb(number,number,number) E.g. rgb(10,122,255)'));
  }

  public static colorStringToRgb(colorString: string, type: ColorStringTypes): RGB {
    if (type === ColorStringTypes.HEX) return RgbParser.hexStringToRgb(colorString);
    if (type === ColorStringTypes.RGB) return RgbParser.rgbStringToRgb(colorString);
    return { r: 0, g: 0, b: 0 };
  }
}
