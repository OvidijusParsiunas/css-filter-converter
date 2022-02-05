import { CombinedState, combineReducers, Reducer } from 'redux';
import { ColorInputReducer } from './colorInput/reducer';
import { ColorInputState } from './colorInput/types';
import { ResultReducer } from './result/reducer';
import { ResultState } from './result/type';

export type RootReducer = {
  colorInput: ColorInputState;
  result: ResultState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  colorInput: ColorInputReducer,
  result: ResultReducer,
});
