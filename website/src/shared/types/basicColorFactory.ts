import { RGB, HEX, HSL, KEYWORD } from 'color-convert/conversions';
import { BasicColorTypes } from '../consts/colorTypes';

export type ColorConversionTypes = RGB | HEX | HSL | KEYWORD;

export type ColorToConverter<T> = { [key in BasicColorTypes]?: (color: T) => ColorConversionTypes };

export type ConversionResult = ColorConversionTypes | 'error';
