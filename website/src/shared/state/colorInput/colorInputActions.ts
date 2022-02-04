import { ColorInputAction } from '../../types/state/colorInput/colorInputActions';

export const updateIsColorValid = (isValid: boolean): ColorInputAction => ({
  type: 'UPDATE_IS_VALID',
  payload: { isValid },
});
