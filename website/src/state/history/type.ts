import { HistoryActionTypes } from './consts';

type AddToInputHistoryAction = { type: HistoryActionTypes.ADD_TO_INPUT_HISTORY; payload: { text: string } };

type AddToResultHistoryAction = { type: HistoryActionTypes.ADD_TO_RESULT_HISTORY; payload: { text: string } };

export type HistoryAction = AddToInputHistoryAction | AddToResultHistoryAction;

export interface HistoryState {
  input: string[];
  result: string[];
}
