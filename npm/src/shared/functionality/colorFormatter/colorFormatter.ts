import { HSL, RGB } from 'color-convert/conversions';

export class ColorFormatter {
  public static arrayToRgbString(rgbArray: RGB): string {
    return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  }

  public static arrayToHslString(hslArray: HSL): string {
    return `hsl(${hslArray[0]}deg, ${hslArray[1]}%, ${hslArray[2]}%)`;
  }
}
