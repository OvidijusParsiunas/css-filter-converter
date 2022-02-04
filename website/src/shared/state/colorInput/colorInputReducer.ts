import { ColorInputAction } from '../../types/state/colorInput/colorInputActions';
import { ColorInputState } from '../../types/state/colorInput/colorInputState';
import { BasicColorTypes } from '../../consts/colorTypes';

// configure initial value consts
// consts for actions

const initialState: ColorInputState = {
  isValid: true,
  text: '#3c3ce8',
  colorType: BasicColorTypes.HEX,
};

const initialAction: ColorInputAction = {
  type: 'UPDATE_TEXT',
  payload: { text: '#3c3ce8' },
};

export const ColorInputReducer = (
  state: ColorInputState = initialState,
  action: ColorInputAction = initialAction,
): ColorInputState => {
  switch (action.type) {
    case 'UPDATE_IS_VALID': {
      return { ...state, isValid: action.payload.isValid };
    }
    case 'UPDATE_TEXT': {
      return { ...state, text: action.payload.text };
    }
    case 'UPDATE_COLOR_TYPE': {
      return { ...state, colorType: action.payload.colorType };
    }
    default:
      return state;
  }
};
