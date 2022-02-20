import { MIDDLE_COLUMN_WIDTH_NUMBER } from '../../../../shared/consts/cssPropertyValues';
import { Animations } from '../../../../shared/functionality/animations';
import { ElementRef } from '../../../../shared/types/elementRef';
import { HistoryElement } from '../../../../state/history/type';
import { RootReducer } from '../../../../state/rootReducer';
import { useSelector } from 'react-redux';
import HistoryText from './HistoryText';
import './history.css';

// the reason why input and result history are in the same component and are placed in the same rows alongside
// each other is because input row height needs to be exactly the same as the result height which can vary
// with filter.
export default function History() {
  const historyState = useSelector<RootReducer, RootReducer['history']['history']>((state) => state.history.history);

  const setHistoryRowRef = (element: ElementRef['element'], historyItem: ElementRef) => {
    historyItem.element = element;
  };

  function getHistoryItems(history: HistoryElement[]): JSX.Element[] {
    return history.map((historyElement) => {
      const historyRow: ElementRef = { element: null };
      return (
        <div key={historyElement.id} ref={(element) => setHistoryRowRef(element, historyRow)} className="history-item">
          <HistoryText text={historyElement.input} float="left" isResult={false} textContainerRef={historyRow} />
          <HistoryText text={historyElement.result} float="right" isResult textContainerRef={historyRow} />
        </div>
      );
    });
  }

  function getAnimationClass(): string {
    return Animations.getFadeInClassIfConditionMet(historyState.length > 0, 'history-hidden', 'history-visible');
  }

  return (
    <div
      id="history"
      className={getAnimationClass()}
      style={{ left: `calc(-50vw - ${MIDDLE_COLUMN_WIDTH_NUMBER / 2}px)` }}
    >
      {getHistoryItems(historyState)}
    </div>
  );
}
