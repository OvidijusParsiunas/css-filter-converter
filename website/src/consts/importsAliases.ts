// eslint-disable-next-line import/no-unresolved
import { HEX as _Hex, HSL as _HSL, KEYWORD as _KEYWORD, RGB as _RGB } from 'color-convert/conversions';
// eslint-disable-next-line import/no-unresolved
import _ColorConvert from 'color-convert';

export const ColorConvert = _ColorConvert;

export type HEX = _Hex;
export type RGB = _RGB;
export type HSL = _HSL;
export type KEYWORD = _KEYWORD;
