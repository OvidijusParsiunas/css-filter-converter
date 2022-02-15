import { CombinedState, combineReducers, Reducer } from 'redux';
import { HistoryReducer } from './history/reducer';
import { ResultReducer } from './result/reducer';
import { InputReducer } from './input/reducer';
import { ErrorReducer } from './error/reducer';
import { HistoryState } from './history/type';
import { ResultState } from './result/type';
import { InputState } from './input/types';
import { ErrorState } from './error/type';

export type RootReducer = {
  input: InputState;
  result: ResultState;
  history: HistoryState;
  error: ErrorState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  input: InputReducer,
  result: ResultReducer,
  history: HistoryReducer,
  error: ErrorReducer,
});
