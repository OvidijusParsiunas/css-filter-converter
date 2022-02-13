import { BasicColor } from '../../components/columns/middleColumn/convertButton/convert/basicColors/basicColor';
import { ResultActionTypes } from './consts';

type UpdateFilterAction = { type: ResultActionTypes.UPDATE_RESULT_FILTER; payload: { filter: string } };

type UpdateBasicColorAction = { type: ResultActionTypes.UPDATE_RESULT_BASIC_COLOR; payload: { color: BasicColor } };

export type ResultAction = UpdateFilterAction | UpdateBasicColorAction;

export interface ResultState {
  filter: string;
  basicColor: BasicColor;
}
