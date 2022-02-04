import { BasicColorTypes } from '../../../consts/colorTypes';

type UpdateColorTextAction = { type: 'UPDATE_TEXT'; payload: { text: string } };

type UpdateIsColorValidAction = { type: 'UPDATE_IS_VALID'; payload: { isValid: boolean } };

type UpdateColorTypeAction = { type: 'UPDATE_COLOR_TYPE'; payload: { colorType: BasicColorTypes } };

export type ColorInputAction = UpdateColorTextAction | UpdateIsColorValidAction | UpdateColorTypeAction;
