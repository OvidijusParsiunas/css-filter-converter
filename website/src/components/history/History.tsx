import { HistoryElement, HistoryState } from '../../state/history/type';
import OutputText from '../columns/reactChildren/outputText';
import { RootReducer } from '../../state/rootReducer';
import { useSelector } from 'react-redux';
import CSS from 'csstype';
import './history.css';

export default function History() {
  const historyState = useSelector<RootReducer, RootReducer['history']>((state) => state.history);

  // WORK 1 - extract
  function getResultHeaderText(isResult: boolean): JSX.Element | null {
    return isResult ? <div className="result-header-text history-padding-text">Result:</div> : null;
  }

  // WORK 1 - 52px should be from a const
  function getHistoryColumn(historyElement: HistoryElement, float: CSS.Property.Float, isResult: boolean): JSX.Element {
    return (
      <OutputText float={float} width="calc(50% - 52px)">
        {getResultHeaderText(isResult)}
        <div className="history-text">{historyElement.text}</div>
      </OutputText>
    );
  }

  // WORK 1 - use a different type of state
  function getHistoryItems(state: HistoryState): JSX.Element[] {
    return state.input.map((historyElement, index) => (
      <div key={historyElement.id} className="history-container-item">
        {getHistoryColumn(historyElement, 'left', false)}
        {getHistoryColumn(historyState.result[index], 'right', true)}
      </div>
    ));
  }

  return <div className="history-container">{getHistoryItems(historyState)}</div>;
}
