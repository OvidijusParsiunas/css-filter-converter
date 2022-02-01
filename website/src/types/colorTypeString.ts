import { BASIC_COLOR_TYPES } from '../consts/colorTypes';

export type BasicColorType = typeof BASIC_COLOR_TYPES[keyof typeof BASIC_COLOR_TYPES];
