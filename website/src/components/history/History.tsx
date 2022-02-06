import { HistoryElement } from '../../state/history/type';
import './history.css';

export default function History(props: { state: HistoryElement[] }) {
  const { state } = props;

  const listItems = state.map((result) => (
    <div key={result.id} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'inline-block', verticalAlign: 'top', color: 'white', userSelect: 'none' }}>Result:</div>
      <div style={{ paddingLeft: '10px' }}>{result.text}</div>
    </div>
  ));

  return (
    <div className="results-container">
      <div className="results">{listItems}</div>
    </div>
  );
}
