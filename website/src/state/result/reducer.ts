// prettier-ignore
import {
  BASIC_COLOR_TYPE_TO_CLASS,
} from '../../components/columns/middleColumn/convertButton/convert/basicColors/colorTypeToClass';
import { DEFAULT_VALUES } from '../../shared/consts/defaultValues';
import { ResultAction, ResultState } from './type';
import { ResultActionTypes } from './consts';

const initialState: ResultState = {
  filter: '',
  // basicColor is overwritten by input basicColor object when switch button is clicked
  basicColor: new BASIC_COLOR_TYPE_TO_CLASS[DEFAULT_VALUES.colorType](),
};

const initialAction: ResultAction = {
  type: ResultActionTypes.UPDATE_RESULT_FILTER,
  payload: { filter: initialState.filter },
};

export const ResultReducer = (state: ResultState = initialState, action: ResultAction = initialAction): ResultState => {
  switch (action.type) {
    case ResultActionTypes.UPDATE_RESULT_FILTER: {
      return { ...state, filter: action.payload.filter };
    }
    case ResultActionTypes.UPDATE_RESULT_BASIC_COLOR: {
      return { ...state, basicColor: action.payload.color };
    }
    default:
      return state;
  }
};
