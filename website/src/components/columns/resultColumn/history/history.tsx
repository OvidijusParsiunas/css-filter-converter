import { MIDDLE_COLUMN_WIDTH_NUMBER, SIDE_COLUMN_WIDTH_PX } from '../../../../shared/consts/cssPropertyValues';
import ResultHeaderText from './resultHeaderText/resultHeaderText';
import { HistoryElement } from '../../../../state/history/type';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from './outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import CSS from 'csstype';
import './history.css';

// the reason why input and result history are in the same component and are placed in the same rows alongside
// each other is because input row height needs to be exactly the same as the result height which can vary
// with filter.
export default function History() {
  const historyState = useSelector<RootReducer, RootReducer['history']['history']>((state) => state.history.history);

  function getHistoryColumn(text: string, float: CSS.Property.Float, isResult: boolean): JSX.Element {
    return (
      <OutputText float={float} width={SIDE_COLUMN_WIDTH_PX}>
        {isResult ? <ResultHeaderText classes={['history-padding-text']} /> : null}
        <div className="history-text">{text}</div>
      </OutputText>
    );
  }

  function getHistoryItems(history: HistoryElement[]): JSX.Element[] {
    return history.map((historyElement) => (
      <div key={historyElement.id} className="history-item">
        {getHistoryColumn(historyElement.input, 'left', false)}
        {getHistoryColumn(historyElement.result, 'right', true)}
      </div>
    ));
  }

  return (
    <div id="history" style={{ left: `calc(-50vw - ${MIDDLE_COLUMN_WIDTH_NUMBER / 2}px)` }}>
      {getHistoryItems(historyState)}
    </div>
  );
}
