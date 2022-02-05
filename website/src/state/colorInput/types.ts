import { BasicColorTypes } from '../../shared/consts/colorTypes';
import { ColorInputActionTypes } from './consts';

type UpdateColorAction = { type: ColorInputActionTypes.UPDATE_TEXT; payload: { text: string } };

type UpdateIsValidAction = { type: ColorInputActionTypes.UPDATE_IS_VALID; payload: { isValid: boolean } };

type UpdateColorTypeAction = { type: ColorInputActionTypes.UPDATE_COLOR_TYPE; payload: { colorType: BasicColorTypes } };

export type ColorInputAction = UpdateColorAction | UpdateIsValidAction | UpdateColorTypeAction;

export interface ColorInputState {
  isValid: boolean;
  text: string;
  colorType: BasicColorTypes;
}
