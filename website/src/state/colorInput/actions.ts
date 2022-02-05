import { BasicColorTypes } from '../../shared/consts/colorTypes';
import { ColorInputActionTypes } from './consts';
import { ColorInputAction } from './types';

export const updateColorText = (text: string): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_TEXT,
  payload: { text },
});

export const updateIsValid = (isValid: boolean): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_IS_VALID,
  payload: { isValid },
});

export const updateColorType = (colorType: BasicColorTypes): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_COLOR_TYPE,
  payload: { colorType },
});
