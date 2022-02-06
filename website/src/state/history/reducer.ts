import { HistoryAction, HistoryState } from './type';
import { HistoryActionTypes } from './consts';

// refactor how id is set
let id = 0;

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
  id += 1;
  switch (action.type) {
    case HistoryActionTypes.ADD_TO_INPUT_HISTORY: {
      return { ...state, input: [{ id, text: action.payload.text }, ...state.input] };
    }
    case HistoryActionTypes.ADD_TO_RESULT_HISTORY: {
      return { ...state, result: [{ id, text: action.payload.text }, ...state.result] };
    }
    default:
      return state;
  }
};
