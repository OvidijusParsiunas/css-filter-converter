import { ErrorActionTypes } from './consts';
import { ErrorAction } from './type';

export const displayError = (): ErrorAction => ({
  type: ErrorActionTypes.DISPAY_ERROR,
});

export const hideError = (): ErrorAction => ({
  type: ErrorActionTypes.HIDE_ERROR,
});
