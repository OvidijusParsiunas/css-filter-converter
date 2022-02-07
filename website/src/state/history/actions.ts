import { HistoryActionTypes } from './consts';
import { HistoryAction } from './type';

export const addToHistory = (input: string, result: string): HistoryAction => ({
  type: HistoryActionTypes.ADD_TO_HISTORY,
  payload: { input, result },
});
