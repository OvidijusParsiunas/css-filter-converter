import { InputTypes } from '../../../shared/consts/inputTypes';
import FilterColorInput from './inputTypes/FilterColorInput';
import BasicColorInput from './inputTypes/BasicColorInput';
import { RootReducer } from '../../../state/rootReducer';
import 'react-color-palette/lib/css/styles.css';
import { useSelector } from 'react-redux';

export default function Input() {
  const activeTypeState = useSelector<RootReducer, RootReducer['input']['activeType']>((state) => state.input.activeType);

  return <div>{activeTypeState === InputTypes.BASIC_COLOR ? <BasicColorInput /> : <FilterColorInput />}</div>;
}
