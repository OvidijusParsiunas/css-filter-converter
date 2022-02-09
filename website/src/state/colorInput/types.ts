import { BasicColor } from '../../components/convertButton/convert/basicColors/basicColor';
import { ColorInputActionTypes } from './consts';

type UpdateIsValidAction = { type: ColorInputActionTypes.UPDATE_IS_VALID; payload: { isValid: boolean } };

type UpdateColor = { type: ColorInputActionTypes.UPDATE_COLOR; payload: { color: BasicColor } };

export type ColorInputAction = UpdateIsValidAction | UpdateColor;

export interface ColorInputState {
  isValid: boolean;
  color: BasicColor;
}
