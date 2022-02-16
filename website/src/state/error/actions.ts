import { ErrorAction, ReactDispatch } from './type';
import { ErrorActionTypes } from './consts';

export const displayError = (): ErrorAction => ({
  type: ErrorActionTypes.DISPAY_ERROR,
});

export const hideError = (): ErrorAction => ({
  type: ErrorActionTypes.HIDE_ERROR,
});

export const setDispatch = (dispatch: ReactDispatch): ErrorAction => ({
  type: ErrorActionTypes.SET_DISPATCH_FOR_ERROR,
  payload: { dispatch },
});
