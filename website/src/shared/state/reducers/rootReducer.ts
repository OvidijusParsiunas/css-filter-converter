import { ColorInputState } from '../../types/state/colorInputState';
import { CombinedState, combineReducers, Reducer } from 'redux';
import { ColorInputReducer } from './colorInputReducer';

export type RootReducer = {
  colorInput: ColorInputState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  colorInput: ColorInputReducer,
});
