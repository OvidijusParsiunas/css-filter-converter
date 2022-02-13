import { BasicColor } from '../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { ResultActionTypes } from './consts';
import { ResultAction } from './type';

export const updateResultBasicColor = (color: BasicColor): ResultAction => ({
  type: ResultActionTypes.UPDATE_RESULT_BASIC_COLOR,
  payload: { color },
});

export const updateResultFilter = (text: string): ResultAction => ({
  type: ResultActionTypes.UPDATE_RESULT_FILTER,
  payload: { filter: text },
});
