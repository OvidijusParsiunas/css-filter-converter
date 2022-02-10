import { BasicColor } from '../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { InputTypes } from '../../shared/consts/inputTypes';
import { InputActionTypes } from './consts';

type InputType = InputTypes.BASIC_COLOR | InputTypes.FILTER;

type UpdateIsValidAction = { type: InputActionTypes.UPDATE_IS_VALID; payload: { isValid: boolean } };

type UpdateColorAction = { type: InputActionTypes.UPDATE_COLOR; payload: { color: BasicColor } };

type UpdateFilterAction = { type: InputActionTypes.UPDATE_FILTER; payload: { filter: string } };

type UpdateInputTypeAction = {
  type: InputActionTypes.UPDATE_ACTIVE_INPUT_TYPE;
  payload: { activeType: InputType };
};

export type InputAction = UpdateIsValidAction | UpdateColorAction | UpdateFilterAction | UpdateInputTypeAction;

export interface InputState {
  isValid: boolean;
  basicColor: BasicColor;
  filter: string;
  activeType: InputType;
}
