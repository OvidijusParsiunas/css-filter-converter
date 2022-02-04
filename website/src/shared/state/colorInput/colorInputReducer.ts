import { ColorInputActionTypes } from '../../consts/state/colorInput/colorInputActionTypes';
import { ColorInputAction } from '../../types/state/colorInput/colorInputActions';
import { ColorInputState } from '../../types/state/colorInput/colorInputState';
import { BasicColorTypes } from '../../consts/colorTypes';

const initialState: ColorInputState = {
  isValid: true,
  text: '#3c3ce8',
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
