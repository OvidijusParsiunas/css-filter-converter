import { ColorInputActionTypes } from '../../../consts/state/colorInput/colorInputActionTypes';
import { BasicColorTypes } from '../../../consts/colorTypes';

type UpdateColorTextAndIsInputValidAction = {
  type: ColorInputActionTypes.UPDATE_TEXT_AND_IS_VALID;
  payload: { text: string; isValid: boolean };
};

type UpdateColorTypeAction = { type: ColorInputActionTypes.UPDATE_COLOR_TYPE; payload: { colorType: BasicColorTypes } };

export type ColorInputAction = UpdateColorTextAndIsInputValidAction | UpdateColorTypeAction;
