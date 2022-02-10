import { BasicColor } from '../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { InputActionTypes } from './consts';
import { InputAction } from './types';

export const updateIsValid = (isValid: boolean): InputAction => ({
  type: InputActionTypes.UPDATE_IS_VALID,
  payload: { isValid },
});

export const updateColor = (color: BasicColor): InputAction => ({
  type: InputActionTypes.UPDATE_COLOR,
  payload: { color },
});
