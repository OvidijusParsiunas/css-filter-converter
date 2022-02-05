import { HistoryActionTypes } from './consts';
import { HistoryAction } from './type';

export const addToInputHistory = (text: string): HistoryAction => ({
  type: HistoryActionTypes.ADD_TO_INPUT_HISTORY,
  payload: { text },
});

export const addToResultHistory = (text: string): HistoryAction => ({
  type: HistoryActionTypes.ADD_TO_RESULT_HISTORY,
  payload: { text },
});
