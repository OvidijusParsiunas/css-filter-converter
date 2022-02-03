import { BasicColorTypes } from '../../consts/colorTypes';

export type UpdateTextAction = { type: 'UPDATE_TEXT'; payload: { text: string } };

export type UpdateIsValidAction = { type: 'UPDATE_IS_VALID'; payload: { isValid: boolean } };

export type UpdateColorTypeAction = { type: 'UPDATE_COLOR_TYPE'; payload: { colorType: BasicColorTypes } };

export type ColorInputAction = UpdateTextAction | UpdateIsValidAction | UpdateColorTypeAction;
