import { ResultActionTypes } from '../../consts/state/result/resultActionTypes';
import { ResultAction } from '../../types/state/result/resultActions';
import { ResultState } from '../../types/state/result/resultState';

const initialState: ResultState = {
  text: '',
};

const initialAction: ResultAction = {
  type: ResultActionTypes.UPDATE_RESULT,
  payload: { text: initialState.text },
};

export const ResultReducer = (state: ResultState = initialState, action: ResultAction = initialAction): ResultState => {
  switch (action.type) {
    case ResultActionTypes.UPDATE_RESULT: {
      return { ...state, text: action.payload.text };
    }
    default:
      return state;
  }
};
