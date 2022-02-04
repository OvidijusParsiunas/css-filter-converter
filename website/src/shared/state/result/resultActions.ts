import { ResultActionTypes } from '../../consts/state/result/resultActionTypes';
import { ResultAction } from '../../types/state/result/resultActions';

export const updateResult = (text: string): ResultAction => ({
  type: ResultActionTypes.UPDATE_RESULT,
  payload: { text },
});
