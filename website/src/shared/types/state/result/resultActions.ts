import { ResultActionTypes } from '../../../consts/state/result/resultActionTypes';

type UpdateResultAction = { type: ResultActionTypes.UPDATE_RESULT; payload: { text: string } };

export type ResultAction = UpdateResultAction;
