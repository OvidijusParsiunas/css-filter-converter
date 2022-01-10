import { ColorStringTypes } from '../types/colorStringTypes';

export class RgbArrParser {
  private static regExpMatchArrayToRgbNumArr(rgbArr: string[]): number[] {
    return [parseInt(rgbArr[1], 16), parseInt(rgbArr[2], 16), parseInt(rgbArr[3], 16)];
  }

  private static buildRgbArr(fullHex: string): number[] {
    // extract individual hex: #c11a1a -> ['#c11a1a', 'c1', '1a', '1a', ...]
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (result) return RgbArrParser.regExpMatchArrayToRgbNumArr(result);
    throw new Error(
      `Colour ${fullHex} could not be parsed. Expected string starting with a # and
        followed by 3 or 6 hexadecimal characters. E.g. #03F or #0033FF`,
    );
  }

  private static shorthandHexToFullHex(shorthandHex: string): string {
    // Expand shorthand form: #03F -> #0033FF
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    return shorthandHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  }

  private static hexStringToRgbArr(shorthandHex: string): number[] {
    const fullHex = RgbArrParser.shorthandHexToFullHex(shorthandHex);
    return RgbArrParser.buildRgbArr(fullHex);
  }

  private static rgbStringToRgbArr(rgb: string): number[] {
    const result = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (result) return RgbArrParser.regExpMatchArrayToRgbNumArr(result);
    throw new Error(
      `Colour ${rgb} could not be parsed. Expected the following string format:
        'rgb(number,number,number) E.g. rgb(10,122,255)`,
    );
  }

  public static colorStringToRgbArr(colorString: string, type: ColorStringTypes): number[] {
    if (type === 'hex') return RgbArrParser.hexStringToRgbArr(colorString);
    if (type === 'rgb') return RgbArrParser.rgbStringToRgbArr(colorString);
    return [0, 0, 0];
  }
}
