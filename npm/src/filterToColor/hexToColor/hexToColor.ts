import { ColorFormatter } from '../../shared/functionality/colorFormatter/colorFormatter';
import { FilterToColorOptions } from '../../shared/types/options';
import { HEX, RGB } from 'color-convert/conversions';
import Converter from 'color-convert';

export class HexToColor {
  public static convertToRgb(color: HEX, options?: FilterToColorOptions): RGB | string {
    const result = Converter.hex.rgb(color);
    return options?.resultType === 'string' ? ColorFormatter.arrayToRgbString(result) : result;
  }

  public static convertToHsl(color: HEX, options?: FilterToColorOptions): RGB | string {
    const result = Converter.hex.hsl(color);
    return options?.resultType === 'string' ? ColorFormatter.arrayToHslString(result) : result;
  }
}
