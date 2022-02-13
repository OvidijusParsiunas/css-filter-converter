import { BasicColor } from '../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { InputTypes } from '../../shared/consts/inputTypes';
import { InputActionTypes } from './consts';

type InputType = InputTypes.BASIC_COLOR | InputTypes.FILTER;

type UpdateIsValidAction = { type: InputActionTypes.UPDATE_IS_VALID; payload: { isValid: boolean } };

type UpdateFilterAction = { type: InputActionTypes.UPDATE_INPUT_FILTER; payload: { filter: string } };

type UpdateBasicColorAction = { type: InputActionTypes.UPDATE_INPUT_BASIC_COLOR; payload: { color: BasicColor } };

type UpdateInputTypeAction = {
  type: InputActionTypes.UPDATE_ACTIVE_INPUT_TYPE;
  payload: { activeType: InputType };
};

export type InputAction = UpdateIsValidAction | UpdateBasicColorAction | UpdateFilterAction | UpdateInputTypeAction;

export interface InputState {
  isValid: boolean;
  basicColor: BasicColor;
  filter: string;
  activeType: InputType;
}
