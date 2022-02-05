import { CombinedState, combineReducers, Reducer } from 'redux';
import { ColorInputReducer } from './colorInput/reducer';
import { ColorInputState } from './colorInput/types';
import { HistoryReducer } from './history/reducer';
import { ResultReducer } from './result/reducer';
import { HistoryState } from './history/type';
import { ResultState } from './result/type';

export type RootReducer = {
  colorInput: ColorInputState;
  result: ResultState;
  history: HistoryState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  colorInput: ColorInputReducer,
  result: ResultReducer,
  history: HistoryReducer,
});
