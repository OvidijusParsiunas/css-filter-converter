import { ResultActionTypes } from './consts';
import { ResultAction } from './type';

export const updateResult = (text: string): ResultAction => ({
  type: ResultActionTypes.UPDATE_RESULT,
  payload: { text },
});
