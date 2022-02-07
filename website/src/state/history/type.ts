import { HistoryActionTypes } from './consts';

type AddToHistoryAction = { type: HistoryActionTypes.ADD_TO_HISTORY; payload: { input: string; result: string } };

export type HistoryAction = AddToHistoryAction;

export interface HistoryElement {
  id: number;
  input: string;
  result: string;
}

export interface HistoryState {
  history: HistoryElement[];
  latestId: number;
}
