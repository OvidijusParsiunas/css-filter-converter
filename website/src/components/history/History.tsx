import { RootReducer } from '../../state/rootReducer';
import { useSelector } from 'react-redux';
import './history.css';

export default function History() {
  const resultHistory = useSelector<RootReducer, RootReducer['history']['result']>((state) => state.history.result);

  const listItems = resultHistory.map((result) => (
    <div key={result} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'inline-block', verticalAlign: 'top', color: 'white', userSelect: 'none' }}>Result:</div>
      <div style={{ paddingLeft: '10px' }}>{result}</div>
    </div>
  ));

  return (
    <div className="results-container">
      <div className="results">{listItems}</div>
    </div>
  );
}
