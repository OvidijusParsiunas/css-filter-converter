import { ColorConvert, RGB, HEX, HSL, KEYWORD } from '../consts/importsAliases';
import { BASIC_COLOR_TYPE_STRING } from '../types/colorTypeString';
import { BASIC_COLOR_TYPES } from '../consts/colorTypes';

export class ColorToColor {
  private static readonly PASSTHROUGH_CONVERTER = (color: RGB | HEX | HSL | KEYWORD) => color;

  private static readonly HEX_TO_COLOR = {
    [BASIC_COLOR_TYPES.HEX]: ColorToColor.PASSTHROUGH_CONVERTER,
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.hex.rgb,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.hex.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.hex.keyword,
  };

  private static readonly RGB_TO_COLOR = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.rgb.hex,
    [BASIC_COLOR_TYPES.RGB]: ColorToColor.PASSTHROUGH_CONVERTER,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.rgb.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.rgb.keyword,
  };

  private static readonly HSL_TO_COLOR = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.hsl.hex,
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.hsl.rgb,
    [BASIC_COLOR_TYPES.HSL]: ColorToColor.PASSTHROUGH_CONVERTER,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.hsl.keyword,
  };

  private static readonly KEYWORD_TO_COLOR = {
    [BASIC_COLOR_TYPES.HEX]: ColorConvert.keyword.hex,
    [BASIC_COLOR_TYPES.RGB]: ColorConvert.keyword.rgb,
    [BASIC_COLOR_TYPES.HSL]: ColorConvert.keyword.hsl,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorConvert.keyword.hsl,
  };

  private static readonly FROM_COLOR_TO_CONVERTER = {
    [BASIC_COLOR_TYPES.HEX]: ColorToColor.HEX_TO_COLOR,
    [BASIC_COLOR_TYPES.RGB]: ColorToColor.RGB_TO_COLOR,
    [BASIC_COLOR_TYPES.HSL]: ColorToColor.HSL_TO_COLOR,
    [BASIC_COLOR_TYPES.KEYWORD]: ColorToColor.KEYWORD_TO_COLOR,
  };

  // eslint-disable-next-line no-unused-vars
  public static convert(oldType: BASIC_COLOR_TYPE_STRING, newType: BASIC_COLOR_TYPE_STRING, color: string): string {
    // const converter: any = ColorToColor.FROM_COLOR_TO_CONVERTER[oldType][newType];
    // const result = converter(color);
    return ColorToColor.convertFromRgb(newType, [1, 2, 3]);
  }

  private static convertFromRgb(newType: BASIC_COLOR_TYPE_STRING, color: RGB): string {
    // validate color
    // parse
    const result = ColorToColor.RGB_TO_COLOR[newType](color);
    return result.toString();
  }
}
