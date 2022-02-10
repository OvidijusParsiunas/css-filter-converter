import { BasicColor } from '../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { InputTypes } from '../../shared/consts/inputTypes';
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

export const updateFilter = (filter: string): InputAction => ({
  type: InputActionTypes.UPDATE_FILTER,
  payload: { filter },
});

export const updateActiveInputType = (activeType: InputTypes): InputAction => ({
  type: InputActionTypes.UPDATE_ACTIVE_INPUT_TYPE,
  payload: { activeType },
});
