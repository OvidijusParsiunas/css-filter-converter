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

export const HistoryReducer = (
  state: HistoryState = initialState,
  action: HistoryAction = defaultAction,
): HistoryState => {
  switch (action.type) {
    case HistoryActionTypes.ADD_TO_HISTORY: {
      state.history.unshift({ ...action.payload, id: state.latestId });
      state.latestId += 1;
      return { ...state };
    }
    case HistoryActionTypes.SWITCH_HISTORY: {
      // using copy to trigger refresh of components that are using history array state
      const historyCopy = state.history.slice();
      historyCopy.forEach((historyElement) => {
        const temp = historyElement.input;
        historyElement.input = historyElement.result;
        historyElement.result = temp;
      });
      return { ...state, history: historyCopy };
    }
    default:
      return state;
  }
};
