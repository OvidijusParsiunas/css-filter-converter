import { ErrorActionTypes } from './consts';

type DisplayError = { type: ErrorActionTypes.DISPAY_ERROR };

type HideError = { type: ErrorActionTypes.HIDE_ERROR };

export type ErrorAction = DisplayError | HideError;

export interface ErrorState {
  isErrorDisplayed: boolean;
}
