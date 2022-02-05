import { ResultActionTypes } from './consts';

type UpdateResultAction = { type: ResultActionTypes.UPDATE_RESULT; payload: { text: string } };

export type ResultAction = UpdateResultAction;

export interface ResultState {
  text: string;
}
