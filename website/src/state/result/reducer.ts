import { ResultAction, ResultState } from './type';
import { ResultActionTypes } from './consts';

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
