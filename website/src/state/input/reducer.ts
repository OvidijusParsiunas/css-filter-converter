// prettier-ignore
import {
  BASIC_COLOR_TYPE_TO_CLASS,
} from '../../components/columns/middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { DEFAULT_VALUES } from '../../shared/consts/defaultValues';
import { InputAction, InputState } from './types';
import { InputActionTypes } from './consts';

const initialState: InputState = {
  isValid: true,
  color: new BASIC_COLOR_TYPE_TO_CLASS[DEFAULT_VALUES.colorType](DEFAULT_VALUES.text),
};

const initialAction: InputAction = {
  type: InputActionTypes.UPDATE_IS_VALID,
  payload: { isValid: true },
};

export const InputReducer = (state: InputState = initialState, action: InputAction = initialAction): InputState => {
  switch (action.type) {
    case InputActionTypes.UPDATE_IS_VALID: {
      return { ...state, isValid: action.payload.isValid };
    }
    case InputActionTypes.UPDATE_COLOR: {
      return { ...state, color: action.payload.color };
    }
    default:
      return state;
  }
};
