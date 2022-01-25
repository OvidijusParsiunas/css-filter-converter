import { ColorStringTypes } from '../../types/colorStringTypes';
import { RGBArr } from '../../types/rgbArr';

export class RgbArrParser {
  private static readonly DECIMAL_RADIX = 10;

  private static readonly HEXADECIMAL_RADIX = 16;

  private static createErrorMessage(colorString: string, format: string): string {
    return `Input color string could not be parsed. Expected format: ${format}. String received: ${colorString}.`;
  }

  private static regExpMatchArrayToRgbNumArr(rgbArr: string[], radix: number): RGBArr {
    return [parseInt(rgbArr[1], radix), parseInt(rgbArr[2], radix), parseInt(rgbArr[3], radix)];
  }

  private static buildRgbArr(fullHex: string): RGBArr {
    // extract individual hex: #c11a1a -> ['#c11a1a', 'c1', '1a', '1a', ...]
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (result) return RgbArrParser.regExpMatchArrayToRgbNumArr(result, RgbArrParser.HEXADECIMAL_RADIX);
    throw new Error(RgbArrParser.createErrorMessage(fullHex, '#HHH or #HHHHHH where H is hex. E.g. #03F or #0033FF'));
  }

  private static shorthandHexToFullHex(shorthandHex: string): string {
    // Expand shorthand form: #03F -> #0033FF
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    return shorthandHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  }

  private static hexStringToRgbArr(shorthandHex: string): RGBArr {
    const fullHex = RgbArrParser.shorthandHexToFullHex(shorthandHex);
    return RgbArrParser.buildRgbArr(fullHex);
  }

  private static rgbStringToRgbArr(rgb: string): RGBArr {
    const result = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (result) return RgbArrParser.regExpMatchArrayToRgbNumArr(result, RgbArrParser.DECIMAL_RADIX);
    throw new Error(RgbArrParser.createErrorMessage(rgb, 'rgb(number,number,number) E.g. rgb(10,122,255)'));
  }

  public static colorStringToRgbArr(colorString: string, type: ColorStringTypes): RGBArr {
    if (type === 'hex') return RgbArrParser.hexStringToRgbArr(colorString);
    if (type === 'rgb') return RgbArrParser.rgbStringToRgbArr(colorString);
    return [0, 0, 0];
  }
}
