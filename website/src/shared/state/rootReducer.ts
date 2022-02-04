import { ColorInputReducer } from './colorInput/colorInputReducer';
import { CombinedState, combineReducers, Reducer } from 'redux';
import { RootReducer } from '../types/state/rootReducer';

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  colorInput: ColorInputReducer,
});
