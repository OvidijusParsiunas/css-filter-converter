import { BasicColorTypes } from '../../shared/consts/colorTypes';
import { ColorInputAction, ColorInputState } from './types';
import { ColorInputActionTypes } from './consts';

const initialState: ColorInputState = {
  isValid: true,
  text: '#87CEFA',
  colorType: BasicColorTypes.HEX,
};

const initialAction: ColorInputAction = {
  type: ColorInputActionTypes.UPDATE_TEXT,
  payload: { text: initialState.text },
};

export const ColorInputReducer = (
  state: ColorInputState = initialState,
  action: ColorInputAction = initialAction,
): ColorInputState => {
  switch (action.type) {
    case ColorInputActionTypes.UPDATE_TEXT: {
      return { ...state, text: action.payload.text };
    }
    case ColorInputActionTypes.UPDATE_IS_VALID: {
      return { ...state, isValid: action.payload.isValid };
    }
    case ColorInputActionTypes.UPDATE_COLOR_TYPE: {
      return { ...state, colorType: action.payload.colorType };
    }
    default:
      return state;
  }
};
