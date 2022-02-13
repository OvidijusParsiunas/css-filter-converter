import { BasicColorTypes } from '../../shared/consts/colorTypes';
import { HistoryActionTypes } from './consts';

type AddToHistoryAction = {
  type: HistoryActionTypes.ADD_TO_HISTORY;
  payload: { input: string; result: string; basicColorType: BasicColorTypes };
};

type SwitchHistoryAction = { type: HistoryActionTypes.SWITCH_HISTORY };

export type HistoryAction = AddToHistoryAction | SwitchHistoryAction;

export interface HistoryElement {
  id: number;
  input: string;
  result: string;
  basicColorType: BasicColorTypes;
}

export interface HistoryState {
  history: HistoryElement[];
  latestId: number;
}
