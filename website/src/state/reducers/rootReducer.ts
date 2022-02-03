import { ColorInputReducer, ValidationState } from './colorInputReducer';
import { CombinedState, combineReducers, Reducer } from 'redux';

export type RootReducer = {
  colorInput: ValidationState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  colorInput: ColorInputReducer,
});
