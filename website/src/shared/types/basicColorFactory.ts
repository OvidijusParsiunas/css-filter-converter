import { RGB, HEX, HSL, KEYWORD } from 'color-convert/conversions';
import { BasicColorTypes } from '../consts/colorTypes';

export type PossibleReturnColors = RGB | HEX | HSL | KEYWORD;

export type ColorToConverter<T> = { [key in BasicColorTypes]?: (color: T) => PossibleReturnColors };

export type ConversionResult = PossibleReturnColors | 'error';
