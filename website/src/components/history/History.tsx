import { HistoryElement } from '../../state/history/type';
import './history.css';

export default function History(props: { state: HistoryElement[] }) {
  const { state } = props;

  const listItems = state.map((result) => (
    <div key={result.id} className="history-item">
      <div className="history-hidden-result-text">Result:</div>
      <div className="history-text">{result.text}</div>
    </div>
  ));

  return (
    <div className="history-component-container">
      <div className="history-list-container">{listItems}</div>
    </div>
  );
}
