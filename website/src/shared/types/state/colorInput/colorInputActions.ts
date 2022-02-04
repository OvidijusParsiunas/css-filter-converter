import { ColorInputActionTypes } from '../../../consts/state/colorInput/colorInputActionTypes';
import { BasicColorTypes } from '../../../consts/colorTypes';

type UpdateColorAction = { type: ColorInputActionTypes.UPDATE_TEXT; payload: { text: string } };

type UpdateIsValidAction = { type: ColorInputActionTypes.UPDATE_IS_VALID; payload: { isValid: boolean } };

type UpdateColorTypeAction = { type: ColorInputActionTypes.UPDATE_COLOR_TYPE; payload: { colorType: BasicColorTypes } };

export type ColorInputAction = UpdateColorAction | UpdateIsValidAction | UpdateColorTypeAction;
