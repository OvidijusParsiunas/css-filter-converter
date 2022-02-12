import { MIDDLE_COLUMN_WIDTH_NUMBER, SIDE_COLUMN_WIDTH_PX } from '../../../../shared/consts/cssPropertyValues';
import ResultHeaderText from '../resultHeaderText/resultHeaderText';
import { HistoryElement } from '../../../../state/history/type';
import { RootReducer } from '../../../../state/rootReducer';
import OutputText from '../outputTextWrapper/outputText';
import { useSelector } from 'react-redux';
import CSS from 'csstype';
import './history.css';

interface HistoryItem {
  element: HTMLElement | null;
}

// the reason why input and result history are in the same component and are placed in the same rows alongside
// each other is because input row height needs to be exactly the same as the result height which can vary
// with filter.
export default function History() {
  const historyState = useSelector<RootReducer, RootReducer['history']['history']>((state) => state.history.history);

  function changeTextColor(color: CSS.Property.Color, hItem: HistoryItem): void {
    if (hItem.element) hItem.element.style.color = color;
  }

  function getHistoryColumn(text: string, float: CSS.Property.Float, isResult: boolean, hItem: HistoryItem): JSX.Element {
    return (
      <OutputText float={float} width={SIDE_COLUMN_WIDTH_PX}>
        {isResult ? <ResultHeaderText prefixClasses={['history-padding-text']} /> : null}
        <div
          className="history-text"
          onMouseEnter={() => changeTextColor('black', hItem)}
          onMouseLeave={() => changeTextColor('grey', hItem)}
        >
          {text}
        </div>
      </OutputText>
    );
  }

  const setHistoryItemRef = (element: HistoryItem['element'], historyItem: HistoryItem) => {
    historyItem.element = element;
  };

  function getHistoryItems(history: HistoryElement[]): JSX.Element[] {
    return history.map((historyElement) => {
      const historyItem: HistoryItem = { element: null };
      return (
        <div key={historyElement.id} ref={(element) => setHistoryItemRef(element, historyItem)} className="history-item">
          {getHistoryColumn(historyElement.input, 'left', false, historyItem)}
          {getHistoryColumn(historyElement.result, 'right', true, historyItem)}
        </div>
      );
    });
  }

  return (
    <div id="history" style={{ left: `calc(-50vw - ${MIDDLE_COLUMN_WIDTH_NUMBER / 2}px)` }}>
      {/* UX */}
      {/* {getHistoryItems(historyState.slice(1))} */}
      {getHistoryItems(historyState)}
    </div>
  );
}
