import { BASIC_COLOR_TYPES } from '../consts/colorTypes';

export type BASIC_COLOR_TYPE_STRING = typeof BASIC_COLOR_TYPES[keyof typeof BASIC_COLOR_TYPES];
