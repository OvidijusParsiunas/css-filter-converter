import { ErrorActionTypes } from './consts';

type DisplayError = { type: ErrorActionTypes.DISPAY_ERROR };

type HideError = { type: ErrorActionTypes.HIDE_ERROR };

export type ReactDispatch = (errorAction: ErrorAction) => void;

type SetDispatch = {
  type: ErrorActionTypes.SET_DISPATCH_FOR_ERROR;
  payload: { dispatch: ReactDispatch };
};

export type ErrorAction = DisplayError | HideError | SetDispatch;

export interface ErrorState {
  isErrorDisplayed: boolean;
  dispatch: ReactDispatch | null;
}
