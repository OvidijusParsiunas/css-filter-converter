import { BasicColorTypes } from '../../../../shared/consts/colorTypes';
import { KeywordBasicColor } from './keyword';
import { HexBasicColor } from './hex';
import { HSLBasicColor } from './hsl';
import { RGBBasicColor } from './rgb';

export const BASIC_COLOR_TYPE_TO_CLASS = {
  [BasicColorTypes.HEX]: HexBasicColor,
  [BasicColorTypes.RGB]: RGBBasicColor,
  [BasicColorTypes.HSL]: HSLBasicColor,
  [BasicColorTypes.KEYWORD]: KeywordBasicColor,
} as const;
