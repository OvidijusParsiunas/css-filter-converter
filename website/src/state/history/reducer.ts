import { HistoryAction, HistoryState } from './type';
import { HistoryActionTypes } from './consts';

const initialState: HistoryState = {
  history: [],
  latestId: 0,
};

const defaultAction: HistoryAction = {
  type: HistoryActionTypes.ADD_TO_HISTORY,
  payload: { input: 'error', result: 'error' },
};

function updateInput(state: HistoryState, action: HistoryAction): HistoryState {
  state.history.unshift({ ...action.payload, id: state.latestId });
  state.latestId += 1;
  return { ...state };
}

export const HistoryReducer = (
  state: HistoryState = initialState,
  action: HistoryAction = defaultAction,
): HistoryState => {
  switch (action.type) {
    case HistoryActionTypes.ADD_TO_HISTORY: {
      return updateInput(state, action);
    }
    default:
      return state;
  }
};
