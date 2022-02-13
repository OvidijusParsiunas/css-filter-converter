// prettier-ignore
import {
  BASIC_COLOR_TYPE_TO_CLASS,
} from '../../components/columns/middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { DEFAULT_VALUES } from '../../shared/consts/defaultValues';
import { InputTypes } from '../../shared/consts/inputTypes';
import { InputAction, InputState } from './types';
import { InputActionTypes } from './consts';

const initialState: InputState = {
  isValid: true,
  // basicColor is overwritten by result basicColor object when switch button is clicked
  basicColor: new BASIC_COLOR_TYPE_TO_CLASS[DEFAULT_VALUES.colorType](DEFAULT_VALUES.text),
  filter: '',
  activeType: InputTypes.BASIC_COLOR,
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
    case InputActionTypes.UPDATE_INPUT_BASIC_COLOR: {
      return { ...state, basicColor: action.payload.color };
    }
    case InputActionTypes.UPDATE_INPUT_FILTER: {
      return { ...state, filter: action.payload.filter };
    }
    case InputActionTypes.UPDATE_ACTIVE_INPUT_TYPE: {
      return { ...state, activeType: action.payload.activeType };
    }
    default:
      return state;
  }
};
