import { BasicColor } from '../../components/convertButton/convert/basicColors/basicColor';
import { ColorInputActionTypes } from './consts';
import { ColorInputAction } from './types';

export const updateIsValid = (isValid: boolean): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_IS_VALID,
  payload: { isValid },
});

export const updateColor = (color: BasicColor): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_COLOR,
  payload: { color },
});
