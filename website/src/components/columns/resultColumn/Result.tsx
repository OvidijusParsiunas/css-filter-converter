import FilterColorResult from './resultTypes/FilterColorResult';
import { InputTypes } from '../../../shared/consts/inputTypes';
import BasicColorResult from './resultTypes/BasicColorResult';
import { RootReducer } from '../../../state/rootReducer';
import { useSelector } from 'react-redux';
import './result.css';

export default function Result() {
  const inputTypeState = useSelector<RootReducer, RootReducer['input']['activeType']>((state) => state.input.activeType);

  return <div id="result">{inputTypeState === InputTypes.FILTER ? <BasicColorResult /> : <FilterColorResult />}</div>;
}
