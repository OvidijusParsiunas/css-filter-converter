import { ColorInputActionTypes } from '../../consts/state/colorInput/colorInputActionTypes';
import { ColorInputAction } from '../../types/state/colorInput/colorInputActions';

export const updateIsColorValid = (isValid: boolean): ColorInputAction => ({
  type: ColorInputActionTypes.UPDATE_IS_VALID,
  payload: { isValid },
});
