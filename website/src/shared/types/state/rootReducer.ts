import { ColorInputState } from './colorInput/colorInputState';
import { ResultState } from './result/resultState';

export type RootReducer = {
  colorInput: ColorInputState;
  result: ResultState;
};
