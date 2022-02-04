import { BasicColorTypes } from '../../../consts/colorTypes';

export interface ColorInputState {
  isValid: boolean;
  text: string;
  colorType: BasicColorTypes;
}
