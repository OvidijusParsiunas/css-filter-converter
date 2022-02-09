import { CombinedState, combineReducers, Reducer } from 'redux';
import { HistoryReducer } from './history/reducer';
import { ResultReducer } from './result/reducer';
import { InputReducer } from './input/reducer';
import { HistoryState } from './history/type';
import { ResultState } from './result/type';
import { InputState } from './input/types';

export type RootReducer = {
  input: InputState;
  result: ResultState;
  history: HistoryState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  input: InputReducer,
  result: ResultReducer,
  history: HistoryReducer,
});
