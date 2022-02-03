import { BasicColorTypes } from '../../shared/consts/colorTypes';

// configure initial value consts
// consts for actions

export interface ValidationState {
  isValid: boolean;
  text: string;
  colorType: BasicColorTypes;
}

const initialState: ValidationState = {
  isValid: true,
  text: '#3c3ce8',
  colorType: BasicColorTypes.HEX,
};

const initialAction: ColorInputAction = {
  type: 'UPDATE_TEXT',
  payload: { text: '#3c3ce8' },
};

export type UpdateTextAction = { type: 'UPDATE_TEXT'; payload: { text: string } };
export type UpdateIsValidAction = { type: 'UPDATE_IS_VALID'; payload: { isValid: boolean } };
export type UpdateColorTypeAction = { type: 'UPDATE_COLOR_TYPE'; payload: { colorType: BasicColorTypes } };

export type ColorInputAction = UpdateTextAction | UpdateIsValidAction | UpdateColorTypeAction;

export const ColorInputReducer = (
  state: ValidationState = initialState,
  action: ColorInputAction = initialAction,
): ValidationState => {
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
