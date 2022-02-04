import { ColorInputActionTypes } from '../../consts/state/colorInput/colorInputActionTypes';
import { ColorInputAction } from '../../types/state/colorInput/colorInputActions';
import { BasicColorTypes } from '../../consts/colorTypes';

export const updateColorTextAndIsValid = (text: string, isValid: boolean): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_TEXT_AND_IS_VALID,
  payload: { text, isValid },
});

export const updateColorType = (colorType: BasicColorTypes): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_COLOR_TYPE,
  payload: { colorType },
});
