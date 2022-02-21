import FilterColorResult from './resultTypes/FilterColorResult';
import { InputTypes } from '../../../shared/consts/inputTypes';
import BasicColorResult from './resultTypes/BasicColorResult';
import { RootReducer } from '../../../state/rootReducer';
import { useSelector } from 'react-redux';
import History from './history/History';
import './result.css';

interface Props {
  resultHeaderTextRef: React.RefObject<HTMLDivElement>;
}

export default function Result(props: Props) {
  const { resultHeaderTextRef } = props;
  const inputTypeState = useSelector<RootReducer, RootReducer['input']['activeType']>((state) => state.input.activeType);

  // The reason why history is a child of the result component is because it has to always safely be below the result text
  // which can usually get high with long filter results (especially when window width is narrow).
  return (
    <div id="result">
      {inputTypeState === InputTypes.FILTER ? (
        <BasicColorResult resultHeaderTextRef={resultHeaderTextRef}>
          <History />
        </BasicColorResult>
      ) : (
        <FilterColorResult resultHeaderTextRef={resultHeaderTextRef}>
          <History />
        </FilterColorResult>
      )}
    </div>
  );
}
