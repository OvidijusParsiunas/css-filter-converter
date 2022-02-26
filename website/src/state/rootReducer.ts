import { CombinedState, combineReducers, Reducer } from 'redux';
import { SettingsReducer } from './settings/reducer';
import { HistoryReducer } from './history/reducer';
import { ResultReducer } from './result/reducer';
import { SettingsState } from './settings/type';
import { InputReducer } from './input/reducer';
import { ErrorReducer } from './error/reducer';
import { HistoryState } from './history/type';
import { ResultState } from './result/type';
import { InputState } from './input/types';
import { ErrorState } from './error/type';

export type RootReducer = {
  error: ErrorState;
  input: InputState;
  result: ResultState;
  history: HistoryState;
  settings: SettingsState;
};

export const rootReducer: Reducer<CombinedState<RootReducer>, never> = combineReducers({
  error: ErrorReducer,
  input: InputReducer,
  result: ResultReducer,
  history: HistoryReducer,
  settings: SettingsReducer,
});
