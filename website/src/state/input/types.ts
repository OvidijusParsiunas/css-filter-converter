import { BasicColor } from '../../components/convertButton/convert/basicColors/basicColor';
import { InputActionTypes } from './consts';

type UpdateIsValidAction = { type: InputActionTypes.UPDATE_IS_VALID; payload: { isValid: boolean } };

type UpdateColorAction = { type: InputActionTypes.UPDATE_COLOR; payload: { color: BasicColor } };

export type InputAction = UpdateIsValidAction | UpdateColorAction;

export interface InputState {
  isValid: boolean;
  color: BasicColor;
}
