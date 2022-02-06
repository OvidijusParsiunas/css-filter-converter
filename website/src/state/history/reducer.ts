import { HistoryAction, HistoryState } from './type';
import { HistoryActionTypes } from './consts';

const initialState: HistoryState = {
  input: [],
  result: [],
};

const defaultAction: HistoryAction = {
  type: HistoryActionTypes.ADD_TO_RESULT_HISTORY,
  payload: { text: 'error' },
};

export const HistoryReducer = (
  state: HistoryState = initialState,
  action: HistoryAction = defaultAction,
): HistoryState => {
  switch (action.type) {
    case HistoryActionTypes.ADD_TO_INPUT_HISTORY: {
      return { ...state, input: [action.payload.text, ...state.input] };
    }
    case HistoryActionTypes.ADD_TO_RESULT_HISTORY: {
      return { ...state, result: [action.payload.text, ...state.result] };
    }
    default:
      return state;
  }
};
