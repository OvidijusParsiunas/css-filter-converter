import { BasicColorTypes } from '../../shared/consts/colorTypes';
import { HistoryActionTypes } from './consts';
import { HistoryAction } from './type';

export const addToHistory = (input: string, result: string, basicColorType: BasicColorTypes): HistoryAction => ({
  type: HistoryActionTypes.ADD_TO_HISTORY,
  payload: { input, result, basicColorType },
});

export const switchHistory = (): HistoryAction => ({
  type: HistoryActionTypes.SWITCH_HISTORY,
});
