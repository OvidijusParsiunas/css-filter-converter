import { MIDDLE_COLUMN_WIDTH_NUMBER, SIDE_COLUMN_WIDTH_PX } from '../../../../shared/consts/cssPropertyValues';
import { HistoryElement, HistoryState } from '../../../../state/history/type';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from './outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import CSS from 'csstype';
import './history.css';

// the reason why input and result history are in the same component and are placed in the same rows alongside
// each other is because input row height needs to be exactly the same as the result height which can vary
// with filter.
export default function History() {
  const historyState = useSelector<RootReducer, RootReducer['history']>((state) => state.history);

  // WORK 1 - extract
  function getResultHeaderText(isResult: boolean): JSX.Element | null {
    return isResult ? <div className="result-header-text history-padding-text">Result:</div> : null;
  }

  function getHistoryColumn(historyElement: HistoryElement, float: CSS.Property.Float, isResult: boolean): JSX.Element {
    return (
      <OutputText float={float} width={SIDE_COLUMN_WIDTH_PX}>
        {getResultHeaderText(isResult)}
        <div className="history-text">{historyElement.text}</div>
      </OutputText>
    );
  }

  // WORK 1 - use a different type of state
  function getHistoryItems(state: HistoryState): JSX.Element[] {
    return state.input.map((historyElement, index) => (
      <div key={historyElement.id} className="history-item">
        {getHistoryColumn(historyElement, 'left', false)}
        {getHistoryColumn(historyState.result[index], 'right', true)}
      </div>
    ));
  }

  return (
    <div id="history" style={{ left: `calc(-50vw - ${MIDDLE_COLUMN_WIDTH_NUMBER / 2}px)` }}>
      {getHistoryItems(historyState)}
    </div>
  );
}
