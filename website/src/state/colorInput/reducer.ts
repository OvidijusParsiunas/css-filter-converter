import { BASIC_COLOR_TYPE_TO_CLASS } from '../../components/convertButton/convert/basicColors/colorTypeToClass';
import { DEFAULT_VALUES } from '../../shared/consts/defaultValues';
import { ColorInputAction, ColorInputState } from './types';
import { ColorInputActionTypes } from './consts';

const initialState: ColorInputState = {
  isValid: true,
  color: new BASIC_COLOR_TYPE_TO_CLASS[DEFAULT_VALUES.colorType](DEFAULT_VALUES.text),
};

const initialAction: ColorInputAction = {
  type: ColorInputActionTypes.UPDATE_IS_VALID,
  payload: { isValid: true },
};

export const ColorInputReducer = (
  state: ColorInputState = initialState,
  action: ColorInputAction = initialAction,
): ColorInputState => {
  switch (action.type) {
    case ColorInputActionTypes.UPDATE_IS_VALID: {
      return { ...state, isValid: action.payload.isValid };
    }
    case ColorInputActionTypes.UPDATE_COLOR: {
      return { ...state, color: action.payload.color };
    }
    default:
      return state;
  }
};
