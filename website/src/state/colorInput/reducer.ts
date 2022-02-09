import { BASIC_COLOR_TYPE_TO_CLASS } from '../../components/convertButton/convert/basicColors/colorTypeToClass';
import { DEFAULT_VALUES } from '../../shared/consts/defaultValues';
import { ColorInputAction, ColorInputState } from './types';
import { ColorInputActionTypes } from './consts';

// WORK - text deos not need to be used
// WORK - rename color type to basicColor
const initialState: ColorInputState = {
  isValid: true,
  text: DEFAULT_VALUES.text,
  colorType: new BASIC_COLOR_TYPE_TO_CLASS[DEFAULT_VALUES.colorType](DEFAULT_VALUES.text),
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
